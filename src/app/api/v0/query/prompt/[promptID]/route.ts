import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";
import { Prompt } from "@/utils/types";

const PullsList = pullsList as Prompt[];
export async function GET(
  req: any,
  { params }: { params: { promptID: string } }
) {
  try {
    const { promptID } = params;
    const record = PullsList?.find((item) => item?.id === promptID);
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
