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
        if(prompt === 'query#1234567891'){  // example
          list[itemIndex].description = `This query first calculates the total order value and number of orders for each product from the Sales DB and for the category (minus our products) from the Category DB for each quarter, using sales database. It then calculates the average order value for our products and the rest of category for each quarter, and returns the results for the most recent ${variables?.[0]?.value} quarters.`;
          list[itemIndex].sql = `WITH product_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, product_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), product_id ), category_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, category_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id NOT IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') AND category_id IN (SELECT category_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), category_id ) SELECT p.sale_quarter, p.sale_year, AVG(p.total_order_value / p.num_orders) AS avg_order_value, AVG(c.total_order_value / c.num_orders) AS avg_category_order_value FROM product_sales p JOIN category_sales c ON p.sale_quarter = c.sale_quarter AND p.sale_year = c.sale_year WHERE p.sale_quarter IN ( SELECT EXTRACT(QUARTER FROM sale_date) FROM sales_data WHERE EXTRACT(YEAR FROM sale_date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY sale_date DESC LIMIT ${variables?.[0]?.value} ) GROUP BY p.sale_quarter, p.sale_year ORDER BY p.sale_quarter DESC`
        }else{ // static
          list[itemIndex].description = `Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made ${variables?.[0]?.value} or more orders.`;
          list[itemIndex].sql = `select * from \`dbt-tutorial\`.jaffle_shop.customers\nselect * from \`dbt-tutorial\`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from \`helical-math-378821\`.\`shop\`.\`orders\`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from \`helical-math-378821\`.\`shop\`.\`merge\`\nwhere order_count >= ${variables?.[0]?.value}.0`  
        }
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