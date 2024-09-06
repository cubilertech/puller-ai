// import path from "path";
// import fs from "fs";
import { NextResponse } from "next/server";
import { Prompt, submitValidatePayload } from "@/utils/types";
import clientPromise from "@/libs/mongodb/connection";
import { UpdateData } from "@/utils/common";
export async function POST(req: any, res: any) {
    try {
      const client = await clientPromise;
      const db = client.db('demo_mode');
      const { prompt, variables  }: submitValidatePayload = await req.json();
      
    const record = await db.collection('pulls').findOne({ id: prompt });
      if(!record){
        return NextResponse.json({ message: "Invalid Prompt ID." }, {
            status: 400,
          });
      }
      if(variables && variables?.length){
        record.variables = variables;
        if(prompt){  // example
          const Data = UpdateData(variables, prompt);
          record.description = Data?.description;
          record.sql = Data?.sql;
        }else{ // static
          record.description = `Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made ${variables?.[0]?.value} or more orders.`;
          record.sql = `select * from \`dbt-tutorial\`.jaffle_shop.customers\nselect * from \`dbt-tutorial\`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from \`helical-math-378821\`.\`shop\`.\`orders\`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from \`helical-math-378821\`.\`shop\`.\`merge\`\nwhere order_count >= ${variables?.[0]?.value}.0`  
        }
        }

        // Save the updated document
      const result = await db.collection('pulls').updateOne(
        { id: prompt },
        { $set: record }
      );

      if (result.modifiedCount === 0) {
        return NextResponse.json({message: 'Failed to update the document.'}, {
          status: 500,
        });
      }
      record.id = record.id?.replace("query#", "");
      
      return NextResponse.json(record);
    } catch (error) {
      console.error(error);
      return NextResponse.json({message: 'Internal server error.'}, {
        status: 500,
      });
    }
  //   if (variables && variables?.length) {
  //     list[itemIndex].variables = variables;
  //     if (prompt) {
  //       // example
  //       const Data = UpdateData(variables, prompt);
  //       list[itemIndex].description = Data?.description;
  //       list[itemIndex].sql = Data?.sql;
  //     } else {
  //       // static
  //       list[itemIndex].description =
  //         `Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made ${variables?.[0]?.value} or more orders.`;
  //       list[itemIndex].sql =
  //         `select * from \`dbt-tutorial\`.jaffle_shop.customers\nselect * from \`dbt-tutorial\`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from \`helical-math-378821\`.\`shop\`.\`orders\`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from \`helical-math-378821\`.\`shop\`.\`merge\`\nwhere order_count >= ${variables?.[0]?.value}.0`;
  //     }
  //   }
  //   // Write the updated data back to the JSON file
  //   fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
  //   return NextResponse.json(list[itemIndex]);
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(
  //     { message: "Internal server error." },
  //     {
  //       status: 500,
  //     }
  //   );
  // }
}
