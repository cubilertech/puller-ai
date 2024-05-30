import { NextResponse } from "next/server";
import { Prompt, appUpdatePayload } from "@/utils/types";
import clientPromise from "@/libs/mongodb/connection";
export async function PUT(req: any, { params }: { params: { id: string } }) {
  try {
    const { status }: appUpdatePayload = await req.json();
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const record = await db.collection("apps").findOne({ id: id });

    if (!record) {
      return NextResponse.json(
        { message: "Invalid App ID." },
        {
          status: 400,
        }
      );
    }
    record.isConnected = status;
    // save updated document
    const result = await db
      .collection("apps")
      .updateOne({ id: id }, { $set: record });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Failed to update the document." },
        {
          status: 500,
        }
      );
    }
    const appsList = await db.collection('apps').find({}).toArray();
    return NextResponse.json(appsList);
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
