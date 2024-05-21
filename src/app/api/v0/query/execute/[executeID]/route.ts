import { NextResponse } from "next/server";
import executesList from "@/utils/ApiData/executes.json";

export async function GET(
  req: any,
  { params }: { params: { executeID: string } }
) {
  try {
    const { executeID } = params;
    const record = executesList.find((item) => item.id === executeID);
    if (!record) {
      return NextResponse.json(
        { message: "Invalid execute ID." },
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
