import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { Prompt, appUpdatePayload } from "@/utils/types";
export async function PUT(req: any, { params }: { params: { id: string } }) {
  try {
    const { status }: appUpdatePayload = await req.json();
    const { id } = params;
    // Get the absolute path to the data.json file
    const filePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "apps.json"
    );
    // Read the JSON file
    const list = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const itemIndex = list.findIndex((item: Prompt) => item.id === id);
    if (itemIndex <= -1) {
      return NextResponse.json(
        { message: "Invalid App ID." },
        {
          status: 400,
        }
      );
    }
    list[itemIndex].isConnected = status;
    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
    return NextResponse.json(list);
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
