import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  try {
    const response = {
      id: "p12345",
      status: "complete",
      result: "https://linktomydata.com/result/p12345",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
