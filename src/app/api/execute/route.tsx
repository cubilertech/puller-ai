import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const response = {
      id: "exec12345",
      status: "new",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
