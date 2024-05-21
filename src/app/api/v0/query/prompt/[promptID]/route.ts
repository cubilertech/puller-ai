import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";

export async function GET(
  req: any,
  { params }: { params: { promptID: string } }
) {
  try {
    const { promptID } = params;
    const record = pullsList.find((item) => item.id === promptID);
    if (!record) {
      return NextResponse.json({ message: "Invalid Prompt ID." }, {
        status: 400,
      });
    }
    return NextResponse.json(record);
  } catch (error) {
    console.error(error);
    return NextResponse.json({message: 'Internal server error.'}, {
      status: 500,
    });
  }
}
