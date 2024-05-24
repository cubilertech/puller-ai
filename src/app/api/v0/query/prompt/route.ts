import { NextResponse } from "next/server";
import pullsList from "@/utils/ApiData/pulls.json";
import { generateRandom10DigitNumber } from "@/utils/common";
import path from "path";
import fs from 'fs';
export async function POST(req: any, res: any) {
  try {
    const { message } = await req.json();
    const id = generateRandom10DigitNumber();
    const payload = {
      query: message ?? '',
      description:
        "Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made 2 or more orders.",
      graph: [
        {
          depends: [],
          description: "table of customers data",
          id: "model.dbt_tutorial.customers",
          name: "customers",
        },
        {
          depends: [],
          description: "table of store orders data",
          id: "model.dbt_tutorial.orders",
          name: "orders",
        },
        {
          depends: ["model.dbt_tutorial.merge"],
          description:
            "filtered table of all our top and most loyal customers at least N orders",
          id: "model.dbt_tutorial.loyalty",
          name: "loyalty",
        },
        {
          depends: [
            "model.dbt_tutorial.customers",
            "model.dbt_tutorial.orders",
          ],
          description: "merged summary table of orders grouped by customer",
          id: "model.dbt_tutorial.merge",
          name: "merge",
        },
      ],
      id: `query#${id}`,
      sql: "select * from `dbt-tutorial`.jaffle_shop.customers\nselect * from `dbt-tutorial`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from `helical-math-378821`.`shop`.`customers`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from `helical-math-378821`.`shop`.`orders`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from `helical-math-378821`.`shop`.`merge`\nwhere order_count >= 2.0",
      target: "model.dbt_tutorial.loyalty",
      variables: [
        {
          id: "loyalty_order_thresh",
          model: "model.dbt_tutorial.loyalty",
          name: "loyalty_order_thresh",
          type: "numeric",
          value: 2,
        },
      ],
    };
    // Get the absolute path to the data.json file
    const filePath = path.join(process.cwd(), 'src', 'utils', 'ApiData', 'pulls.json');
    // Read the JSON file
    const list = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    list.push(payload);
    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

export async function GET(req: any, res: any) {
  try {
    return NextResponse.json(pullsList);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

// function formatText(text: string) {
//   // Remove all spaces
//   let noSpaces = text.replace(/\s+/g, "");
//   // Convert to lowercase
//   let lowerCaseText = noSpaces.toLowerCase();
//   return lowerCaseText;
// }
