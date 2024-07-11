import { NextRequest, NextResponse } from "next/server";
import mime from "mime";
import clientPromise from "@/libs/mongodb/connection";

export async function GET(req: any, res: any) {
  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const retrieversList = await db.collection("apps").find({}).toArray();
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
  const description = formData.get("description") as string;
  const timestamp = formData.get("timestamp") as string;
  const filesData = JSON.parse(formData.get("files") as string); // Parsing the stringified files data

  // const uploadDir = join(process.cwd(), "public");

  // try {
  //   await stat(uploadDir);
  // } catch (e: any) {
  //   if (e.code === "ENOENT") {
  //     // This is for checking if the directory exists (ENOENT : Error No Entry)
  //     await mkdir(uploadDir, { recursive: true });
  //   } else {
  //     console.error(
  //       "Error while trying to create directory when uploading a file\n",
  //       e
  //     );
  //     return NextResponse.json(
  //       { error: "Something went wrong." },
  //       { status: 500 }
  //     );
  //   }
  // }

  try {
    const client = await clientPromise;
    const db = client.db("demo_mode");
    const fileRecords: any = [];

    for (let i = 0; i < filesData.length; i++) {
      const fileData = filesData[i];
      const image = formData.get(`image${i}`) as File;

      // const buffer = Buffer.from(await image.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image?.name?.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      // await writeFile(`${uploadDir}/${filename}`, buffer);
      // const fileUrl = `${uploadDir}/${filename}`;

      fileRecords.push({
        image: filename,
        description: fileData.description,
      });
    }

    const result = await db.collection("retrievers").insertOne({
      icon: "dataRoom",
      status: status ?? "live",
      title,
      files: fileRecords,
      description: description,
      timestamp: timestamp,
    });

    return NextResponse.json(result);
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
