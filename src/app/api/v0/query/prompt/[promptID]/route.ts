import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";

export async function GET(
  req: any,
  { params }: { params: { promptID: string } }
) {
  try {
    const { promptID } = params;
    // console.log(promptID, "id");
    const record = pullsList.find((item) => item.id === promptID);
    if (!record) {
      throw new Error("Invalid Prompt ID.");
    }
    return NextResponse.json(record);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
