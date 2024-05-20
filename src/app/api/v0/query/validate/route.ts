import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { Prompt, submitValidatePayload } from "@/utils/types";
export async function POST(req: any, res: any) {
    try {
      const { prompt, variables  }: submitValidatePayload = await req.json();
      
      // Get the absolute path to the data.json file
      const filePath = path.join(process.cwd(), 'src', 'utils', 'ApiData', 'pulls.json');
      // Read the JSON file
      const list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const itemIndex = list.findIndex((item : Prompt)=>item.id === prompt);
      if(itemIndex <= -1){
        return NextResponse.json({ message: "Invalid Prompt ID." }, {
            status: 400,
          });
      }
      if(variables && variables?.length){
        list[itemIndex].varaibles = variables;
      }
      // Write the updated data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
      return NextResponse.json(list[itemIndex]);
    } catch (error) {
      console.error(error);
      return NextResponse.json({message: 'Internal server error.'}, {
        status: 500,
      });
    }
  }