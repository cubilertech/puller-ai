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
        list[itemIndex].variables = variables;
        list[itemIndex].description = `Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made ${variables?.[0]?.value} or more orders.`;
        list[itemIndex].sql = `select * from \`dbt-tutorial\`.jaffle_shop.customers\nselect * from \`dbt-tutorial\`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from \`helical-math-378821\`.\`shop\`.\`orders\`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from \`helical-math-378821\`.\`shop\`.\`merge\`\nwhere order_count >= ${variables?.[0]?.value}.0`
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