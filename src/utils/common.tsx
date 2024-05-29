import { Fragment, useMemo } from "react";
import { MODES } from "./constants";
import { Prompt, UpdateVariables, Variable } from "./types";
import { Tooltip } from "@/components/Tooltip";

export const getBackendURL = (appMode: string) => {
  switch (appMode) {
    case MODES.PILOT:
      return process.env.NEXT_PUBLIC_BACKEND_URL;
    case MODES.DEMO:
      return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
    default:
      return process.env.NEXT_PUBLIC_DEMO_BACKEND_URL;
  }
};

export const generateRandom10DigitNumber = () => {
  // Generate a random number with exactly 10 digits
  const min = 1000000000; // Smallest 10-digit number
  const max = 9999999999; // Largest 10-digit number

  // Generate a random number in the range [min, max]
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
};

export const getResultOfPrompt = (id: string, baseUrl: string) => {
  switch (id) {
    case "query#1234567890":
      return [
        {
          bytes: 116,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example1.csv`,
        },
      ];
    case "query#1234567891": {
      return [
        {
          bytes: 221,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example4.csv`,
        },
      ];
    }
    case "query#1234567892": {
      return [
        {
          bytes: 104,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example3.csv`,
        },
      ];
    }
    case "query#1234567893": {
      return [
        {
          bytes: 226,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example2.csv`,
        },
      ];
    }
    case "query#1234567894": {
      return [
        {
          bytes: 125,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/example4.csv`,
        },
      ];
    }
    default:
      return [
        {
          bytes: 3778,
          database: "helical-math-378821",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 29,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/examplePromptsCSV/dummy.csv`,
        },
      ];
  }
};

// Utility function to escape special characters in a string for use in a regular expression
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const replaceIdWithVariable = (
  prompt: Prompt,
  handleClickVariable: (value: UpdateVariables) => void
): JSX.Element => {
  if (!prompt || !prompt.description) {
    return (
      <div>
        <p>No description available</p>
      </div>
    );
  }

  if (!prompt.variables || prompt.variables.length === 0) {
    return (
      <div>
        <p>{prompt.description}</p>
      </div>
    );
  }

  let parts: Array<string | JSX.Element> = [prompt.description];

  for (const variable of prompt.variables) {
    const placeholder = variable.id;
    const value = variable.value;

    if (
      typeof placeholder === "string" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      const placeholderRegex = new RegExp(
        `\\[${escapeRegExp(placeholder)}\\]`,
        "g"
      );
      parts = parts.flatMap((part) =>
        typeof part === "string"
          ? part.split(placeholderRegex).reduce(
              (acc, text, i) => {
                if (i === 0) return [text];
                const values: UpdateVariables = {
                  type: variable.type,
                  id: placeholder,
                };
                const replacement = variable.detail ? (
                  variable.type === "String_hover" ? (
                    <Tooltip variant="info" description={variable.detail}>
                      <span className="updateValue_hover">{value}</span>
                    </Tooltip>
                  ) : (
                    <Tooltip variant="info" description={variable.detail}>
                      <span
                        className="updateValue"
                        onClick={() => handleClickVariable(values)}
                      >
                        {value}
                      </span>
                    </Tooltip>
                  )
                ) : (
                  <span
                    key={i}
                    className="updateValue"
                    onClick={() => handleClickVariable(values)}
                  >
                    {value}
                  </span>
                );

                return [...acc, replacement, text];
              },
              [] as Array<string | JSX.Element>
            )
          : [part]
      );
    }
  }

  return (
    <div>
      {parts.map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
    </div>
  );
};

export const UpdateData = (variables: Variable[], prompt: string) => {

  switch (prompt) {
    case "query#1234567891": {
      const SQl_Discriptipn = {
        description: `This query first calculates the total order value and number of orders for each product from the Sales DB and for the category (minus our products) from the Category DB for each quarter, using sales database. It then calculates the average order value for our products and the rest of category for each quarter, and returns the results for the most recent [${variables?.[0]?.id}] quarters.`,
        sql: `WITH product_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, product_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), product_id ), category_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, category_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id NOT IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') AND category_id IN (SELECT category_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), category_id ) SELECT p.sale_quarter, p.sale_year, AVG(p.total_order_value / p.num_orders) AS avg_order_value, AVG(c.total_order_value / c.num_orders) AS avg_category_order_value FROM product_sales p JOIN category_sales c ON p.sale_quarter = c.sale_quarter AND p.sale_year = c.sale_year WHERE p.sale_quarter IN ( SELECT EXTRACT(QUARTER FROM sale_date) FROM sales_data WHERE EXTRACT(YEAR FROM sale_date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY sale_date DESC LIMIT ${variables?.[0]?.value} ) GROUP BY p.sale_quarter, p.sale_year ORDER BY p.sale_quarter DESC`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567890": {
      // const revenue_txt : any = {
      //   'Total Revenue': ' SUM(s.revenue) AS total_revenue',
      //   'Total Units Sold': ' SUM(s.units_sold) AS total_units_sold',
      //   'Avg Profit Margin': 'AVG(s.profit_margin) AS avg_profit_margin'

      // }
      const SQl_Discriptipn = {
        description: `This query looks at the Sales by Region for [ Brand ] and filters for sales [${variables?.[0]?.id}] and groups by region and SKU. It then calculates the [${variables?.[1]?.id}] margin for each SKU within each region. Finally it orders the results by total revenue in descending order and returns only the top [${variables?.[2]?.id}] SKUs.`,
        sql: `SELECT TOP ${variables?.[2]?.value} r.region, s.sku, SUM(s.revenue) AS total_revenue, FROM sales s JOIN region r ON s.region_id = r.id WHERE s.sale_date >= DATEADD(quarter, -1, GETDATE()) GROUP BY r.region, s.sku ORDER BY total_revenue DESC;`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567892": {
      const SQl_Discriptipn = {
        description: `This query joins the Products table with [${variables?.[0]?.id}] [${variables?.[1]?.id}], and filters for products where the current stock level is below the reorder level. [${variables?.[2]?.id}] Finally, it includes the reorder level and the current stock level in the result set. \nNote that the Goods table is a table that stores the stock in and out for each product, with separate fields for the quantity and the date. The Stock field is calculated as the difference between the In and Out fields, and the ReorderLevel field is a threshold value that triggers a reorder when the stock level falls below it.`,
        sql: `SELECT Products.ID, Products.Product, Products.Description, Products.Price, Products.Category, Products.Supplier, Goods.Stock, Goods.ReorderLevel, MAX(CASE WHEN Goods.Stock >= Products.ReorderLevel THEN Goods.Date END) AS LastDateAboveThreshold FROM Products INNER JOIN Goods ON Products.ID = Goods.ProdID WHERE Goods.Stock < Products.ReorderLevel GROUP BY Products.ID, Products.Product, Products.Description, Products.Price, Products.Category, Products.Supplier, Goods.Stock, Goods.ReorderLevel;`,
      };
      return SQl_Discriptipn;
    }
    default:
      const SQl_Discriptipn = {
        description: `This query first calculates the total order value and number of orders for each product from the Sales DB and for the category (minus our products) from the Category DB for each quarter, using sales database. It then calculates the average order value for our products and the rest of category for each quarter, and returns the results for the most recent [${variables?.[0]?.id}] quarters.`,
        sql: `WITH product_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, product_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), product_id ), category_sales AS ( SELECT EXTRACT(QUARTER FROM sale_date) AS sale_quarter, EXTRACT(YEAR FROM sale_date) AS sale_year, category_id, SUM(order_value) AS total_order_value, COUNT(DISTINCT order_id) AS num_orders FROM sales_data WHERE product_id NOT IN (SELECT product_id FROM product_db WHERE brand = 'our_brand') AND category_id IN (SELECT category_id FROM product_db WHERE brand = 'our_brand') GROUP BY EXTRACT(QUARTER FROM sale_date), EXTRACT(YEAR FROM sale_date), category_id ) SELECT p.sale_quarter, p.sale_year, AVG(p.total_order_value / p.num_orders) AS avg_order_value, AVG(c.total_order_value / c.num_orders) AS avg_category_order_value FROM product_sales p JOIN category_sales c ON p.sale_quarter = c.sale_quarter AND p.sale_year = c.sale_year WHERE p.sale_quarter IN ( SELECT EXTRACT(QUARTER FROM sale_date) FROM sales_data WHERE EXTRACT(YEAR FROM sale_date) = EXTRACT(YEAR FROM CURRENT_DATE) ORDER BY sale_date DESC LIMIT ${variables?.[0]?.value} ) GROUP BY p.sale_quarter, p.sale_year ORDER BY p.sale_quarter DESC`,
      };
      return SQl_Discriptipn;
  }
};
