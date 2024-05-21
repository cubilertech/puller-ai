import { NextRequest, NextResponse } from "next/server";
import retrieversList from "@/utils/ApiData/retriever.json";
import path, { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import fs from "fs";

export async function GET(req: any, res: any) {
  try {
    return NextResponse.json(retrieversList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = (formData.get("title") as string) || null;
  const description = (formData.get("description") as string) || null;
  const status = formData.get("status") as string;
  const image = (formData.get("image") as File) || null;

  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      // This is for checking the directory is exist (ENOENT : Error No Entry)
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;

    // Get the absolute path to the data.json file
    const filePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "retriever.json"
    );
    // Read the JSON file
    const list = JSON.parse(fs.readFileSync(filePath, "utf8"));
    list.push({
      icon: "dataRoom",
      status: status ?? "live",
      title,
      description: description ?? "",
      image: fileUrl,
    });
    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");

    return NextResponse.json({});
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
