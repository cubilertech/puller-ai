import { NextResponse } from "next/server";
import retrieversList from "@/utils/ApiData/retriever.json";

export async function GET(req: any, res: any) {
  try {
    return NextResponse.json(retrieversList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
