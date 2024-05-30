import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb/connection";

export async function GET(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db('demo_mode');
    const appsList = await db.collection('apps').find({}).toArray();
    return NextResponse.json(appsList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
