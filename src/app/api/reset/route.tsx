import { join } from "path";
import { promises as fsPromises } from "fs";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  try {

    // Path to your JSON files (replace with your actual paths)
    const filePathRetriever = join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "retriever.json"
    );
    const filePathPulls = join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "pulls.json" // Assuming this is a different file
    );
    // Write the updated data back to the JSON files
    await fsPromises.writeFile(filePathRetriever, JSON.stringify([]), "utf8");
    await fsPromises.writeFile(filePathPulls, JSON.stringify([]), "utf8");

    // Send a successful response
    return NextResponse.json({ message: "JSON files emptied successfully" });
  } catch (error) {
    console.error(error);
    // Send an error response
    return NextResponse.json({ message: "Error emptying JSON files" });
  }
}
