import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb/connection";
import dummyRetrievers from "@/utils/dummyRetrievers.json";

export async function PUT(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    await db.collection("pulls").deleteMany({});
    await db.collection("retrievers").deleteMany({});

    // Insert records from the JSON file into the 'retrievers' collection
    await db.collection("retrievers").insertMany(dummyRetrievers);

    // Send a successful response
    return NextResponse.json({ message: "JSON files emptied successfully" });
  } catch (error) {
    console.error(error);
    // Send an error response
    return NextResponse.json({ message: "Error emptying JSON files" });
  }
}
