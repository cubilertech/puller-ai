import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb/connection";

export async function GET(
  req: any,
  { params }: { params: { promptID: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const { promptID } = params;
    const record = await db.collection("pulls").findOne({ id: promptID });
    if (!record) {
      return NextResponse.json(
        { message: "Invalid Prompt ID." },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(record);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error." },
      {
        status: 500,
      }
    );
  }
}
