import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";
import { generateRandom10DigitNumber } from "@/utils/common";
import path from "path";
import fs from "fs";
import examplePromptsList from "@/utils/examplePrompts.json";
import dummyPrompt from "@/utils/dummyPrompt.json";
import { Prompt, PromptsList } from "@/utils/types";
export async function POST(req: any, res: any) {
  try {
    const { message } = await req.json();
    const formattedMessage = message.replace(/ /g, "").toLowerCase();
    let prompt = (examplePromptsList as PromptsList)[formattedMessage];
    if (!prompt) {
      const id = generateRandom10DigitNumber();
      prompt = { ...dummyPrompt };
      (prompt.id = `query#${id}`), (prompt.query = message);
    }
    // Get the absolute path to the data.json file
    const filePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "pulls.json"
    );
    // Read the JSON file
    const list = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const alreadyExist = list.find((item: Prompt) => item.id === prompt.id);
    if (prompt && !alreadyExist) {
      list.push(prompt);
      // Write the updated data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
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
    return NextResponse.json(pullsList);
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
