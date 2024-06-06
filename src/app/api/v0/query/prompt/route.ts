import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";
import { generateRandom10DigitNumber, getResultOfPrompt } from "@/utils/common";
// import path from "path";
// import fs from "fs";
import examplePromptsList from "@/utils/examplePrompts.json";
import dummyPrompt from "@/utils/dummyPrompt.json";
import { Prompt, PromptsList } from "@/utils/types";
import clientPromise from "@/libs/mongodb/connection";
export async function POST(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db('demo_mode');
    const host = 
      req.headers["x-forwarded-host"] || req.headers.host || "localhost:3000";
    const protocol = req.headers["x-forwarded-proto"] || "http"; // This header is often set by proxies
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;
    const { message } = await req.json();
    const formattedMessage = message.replace(/ /g, "").toLowerCase();
    let prompt = (examplePromptsList as PromptsList)[formattedMessage];
    if (!prompt) {
      const id = generateRandom10DigitNumber();
      prompt = { ...dummyPrompt };
      (prompt.id = `query#${id}`), (prompt.message = message);
    }

    const document = await db.collection('pulls').findOne({ id: prompt.id });

    if (!document) {
      let result = getResultOfPrompt(prompt.id, baseUrl);
      prompt.results = result;
      await db.collection('pulls').insertOne(prompt);
    }
    return NextResponse.json(prompt);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function GET(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db('demo_mode');
    const data = await db.collection('pulls').find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

// function formatText(text: string) {
//   // Remove all spaces
//   let noSpaces = text.replace(/\s+/g, "");
//   // Convert to lowercase
//   let lowerCaseText = noSpaces.toLowerCase();
//   return lowerCaseText;
// }
