import { generateRandom10DigitNumber } from "@/utils/common";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import clientPromise from "@/libs/mongodb/connection";

export async function POST(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const id = generateRandom10DigitNumber();
    const payload = {
      id: `run#${id}`,
      results: [
        {
          bytes: 0,
          database: "helical-math-378821",
          duration: 1.2781953811645508,
          message: "CREATE VIEW (0 processed)",
          rows: 0,
          schema: "shop",
          table: "customers",
          url: "https://console.cloud.google.com/bigquery?p=helical-math-378821&d=shop&t=customers",
        },
        {
          bytes: 0,
          database: "helical-math-378821",
          duration: 1.020392656326294,
          message: "CREATE VIEW (0 processed)",
          rows: 0,
          schema: "shop",
          table: "orders",
          url: "https://console.cloud.google.com/bigquery?p=helical-math-378821&d=shop&t=orders",
        },
        {
          bytes: 4362,
          database: "helical-math-378821",
          duration: 3.822185516357422,
          message: "CREATE TABLE (100.0 rows, 4.3 KiB processed)",
          rows: 100,
          schema: "shop",
          table: "merge",
          url: "https://console.cloud.google.com/bigquery?p=helical-math-378821&d=shop&t=merge",
        },
        {
          bytes: 3778,
          database: "helical-math-378821",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: "https://console.cloud.google.com/bigquery?p=helical-math-378821&d=shop&t=loyalty",
        },
      ],
      status: "complete",
    };
    await db.collection('executes').insertOne(payload);
    return NextResponse.json(payload);
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

export async function GET(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const executesList = await db.collection("executes").find({}).toArray();
    return NextResponse.json(executesList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
