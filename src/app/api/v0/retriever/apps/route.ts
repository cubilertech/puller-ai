import { NextResponse } from "next/server";
import appsList from "@/utils/ApiData/apps.json";

export async function GET(req: any, res: any) {
  try {
    return NextResponse.json(appsList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
