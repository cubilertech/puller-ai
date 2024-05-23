import { NextRequest, NextResponse } from "next/server";
import retrieversList from "@/utils/ApiData/retriever.json";
import path, { join } from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { promises as fsPromises } from 'fs';

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
  const status = formData.get("status") as string;
  
  // Get the files and their descriptions
  const filesData = JSON.parse(formData.get("files") as string);

  const relativeUploadDir = `/uploads/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-")}`;

  const uploadDir = path.join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
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
    const fileRecords = [];

    for (const fileData of filesData) {
      const image = formData.get(fileData.fieldName) as File;
      const description = fileData.description;
      const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;
      fileRecords.push({ url: fileUrl, description });
    }

    const filePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "ApiData",
      "retriever.json"
    );

    const list = JSON.parse(await fsPromises.readFile(filePath, "utf8"));
    list.push({
      icon: "dataRoom",
      status: status ?? "live",
      title,
      files: fileRecords,
    });

    await fsPromises.writeFile(filePath, JSON.stringify(list, null, 2), "utf8");

    return NextResponse.json(list);
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
