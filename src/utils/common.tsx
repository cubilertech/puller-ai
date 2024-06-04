import { Fragment } from "react";
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
          url: `${baseUrl}/example1.csv`,
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
          url: `${baseUrl}/example4.csv`,
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
          url: `${baseUrl}/example3.csv`,
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
          url: `${baseUrl}/example2.csv`,
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
          url: `${baseUrl}/example4.csv`,
        },
      ];
    }
    case "query#1234567895": {
      return [
        {
          bytes: 2.6,
          database: "Prototype",
          duration: 3.0252435207366943,
          message: "CREATE TABLE (29.0 rows, 3.7 KiB processed)",
          rows: 44,
          schema: "shop",
          table: "loyalty",
          url: `${baseUrl}/example5.csv`,
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
          url: `${baseUrl}/dummy.csv`,
        },
      ];
  }
};

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
function escapePercentage(string: string): string {
  return string.replace(/[%]/g, ""); // Remove only "%" signs
}

export const replaceBrandName = (prompt: { description: string }): string => {
  const placeholder = "%Brand%";
  let value = localStorage.getItem("companyName") ?? "Puller";

  // Remove % from the company name
  value = escapePercentage(value);

  // Split the description by the placeholder and join with the value
  const newDescription = prompt.description.split(placeholder).join(value);

  return newDescription;
};

export const getFormatedDescription = (prompt: Prompt): string => {
  if (!prompt || !prompt?.description) {
    return "No description available";
  }
  if (!prompt?.variables || prompt?.variables?.length === 0) {
    return prompt?.description;
  }

  let newDescription = prompt?.description;

  prompt?.variables.forEach((variable) => {
    const placeholder = escapeRegExp(variable.id);
    const value = variable.value;
    const regex = new RegExp(`\\[${placeholder}\\]`, "g");
    newDescription = newDescription.replace(regex, value.toString());
  });

  return newDescription;
};

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
  const discriptipn = replaceBrandName(prompt);
  let parts: Array<string | JSX.Element> = [discriptipn];

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
                const SelectedVariableId = localStorage.getItem("variableId");

                const replacement = variable.detail ? (
                  variable.type === "String_hover" ? (
                    <Tooltip variant="info" description={variable.detail}>
                      <span className="updateValue_hover">{value}</span>
                    </Tooltip>
                  ) : (
                    <Tooltip variant="info" description={variable.detail}>
                      <span
                        className={
                          SelectedVariableId === placeholder
                            ? "selected-value"
                            : "updateValue"
                        }
                        onClick={() => handleClickVariable(values)}
                      >
                        {value}
                      </span>
                    </Tooltip>
                  )
                ) : (
                  <span
                    key={i}
                    className={
                      SelectedVariableId === placeholder
                        ? "selected-value"
                        : "updateValue"
                    }
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

export const replaceIdWithVariableInDescription = (
  prompt: Prompt
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
  const discriptipn = replaceBrandName(prompt);

  let parts: Array<string | JSX.Element> = [discriptipn];

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
                const replacement = <span key={i}>{value}</span>;
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
        description: `This query first calculates the total order value and number of orders for each product from the Sales DB and for the category (minus our products) from the Category DB for each quarter, using sales database. It then calculates the [${variables?.[0].id}] for our products and the rest of category for each quarter, and returns the results for [${variables?.[1].id}] [${variables?.[2].id}] quarters.`,
        sql: `WITH
        product_sales AS (
          SELECT
            EXTRACT(
              QUARTER
              FROM
                sale_date
            ) AS sale_quarter,
            EXTRACT(
              YEAR
              FROM
                sale_date
            ) AS sale_year,
            product_id,
            SUM(order_value) AS total_order_value,
            COUNT(DISTINCT order_id) AS num_orders
          FROM
            sales_data
          WHERE
            product_id IN (
              SELECT
                product_id
              FROM
                product_db
              WHERE
                brand = '%Brand%'
            )
          GROUP BY
            EXTRACT(
              QUARTER
              FROM
                sale_date
            ),
            EXTRACT(
              YEAR
              FROM
                sale_date
            ),
            product_id
        ),
        category_sales AS (
          SELECT
            EXTRACT(
              QUARTER
              FROM
                sale_date
            ) AS sale_quarter,
            EXTRACT(
              YEAR
              FROM
                sale_date
            ) AS sale_year,
            category_id,
            SUM(order_value) AS total_order_value,
            COUNT(DISTINCT order_id) AS num_orders
          FROM
            sales_data
          WHERE
            product_id NOT IN(
              SELECT
                product_id
              FROM
                product_db
              WHERE
                brand = '%Brand%'
            )
            AND category_id IN (
              SELECT
                category_id
              FROM
                product_db
              WHERE
                brand = '%Brand%'
            )
          GROUP BY
            EXTRACT(
              QUARTER
              FROM
                sale_date
            ),
            EXTRACT(
              YEAR
              FROM
                sale_date
            ),
            category_id
        )
      SELECT
        p.sale_quarter,
        p.sale_year,
        AVG(p.total_order_value / p.num_orders) AS avg_order_value,
        AVG(c.total_order_value / c.num_orders) AS avg_category_order_value
      FROM
        product_sales p
        JOIN category_sales c ON p.sale_quarter = c.sale_quarter
        AND p.sale_year = c.sale_year
      WHERE
        p.sale_quarter IN (
          SELECT
            EXTRACT(
              QUARTER
              FROM
                sale_date
            )
          FROM
            sales_data
          WHERE
            EXTRACT(
              YEAR
              FROM
                sale_date
            ) = EXTRACT(
              YEAR
              FROM
                CURRENT_DATE
            )
          ORDER BY
            sale_date DESC
          LIMIT
            ${variables?.[2].value}
        )
      GROUP BY
        p.sale_quarter,
        p.sale_year
      ORDER BY
        p.sale_quarter DESC;`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567890": {
      const revenue_txt = (value: any) => {
        const formattedMessage = value.replace(/ /g, "").toLowerCase();
        switch (formattedMessage) {
          case "totalrevenue":
            return "SUM(s.revenue) AS total_revenue";
          case "totalunitssold":
            return "SUM(s.units_sold) AS total_units_sold";
          case "avgprofitmargin":
            return "AVG(s.profit_margin) AS avg_profit_margin";
          default:
            return "";
        }
      };
      const total_Desc = (value: any) => {
        const formattedMessage = value.replace(/ /g, "").toLowerCase();
        switch (formattedMessage) {
          case "totalrevenue":
            return "total_revenue";
          case "totalunitssold":
            return "total_units_sold";
          case "avgprofitmargin":
            return "avg_profit_margin";
          default:
            return "";
        }
      };
      const SQl_Discriptipn = {
        description: `This query looks at the Sales by Region for %Brand% and filters for sales [${variables?.[0]?.id}] and groups by region and SKU. It then calculates the [${variables?.[1]?.id}] margin for each SKU within each region. Finally it orders the results by total revenue in descending order and returns only the top [${variables?.[2]?.id}] SKUs.`,
        sql: `SELECT TOP ${variables?.[2]?.value} r.region, s.sku, ${revenue_txt(variables?.[1]?.value)}, FROM sales s JOIN region r ON s.region_id = r.id WHERE s.sale_date >= DATEADD(quarter, -1, GETDATE()) GROUP BY r.region, s.sku ORDER BY ${total_Desc(variables?.[1]?.value)} DESC;`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567892": {
      const product_category = (value: any) => {
        const formattedMessage = value.replace(/ /g, "").toLowerCase();
        switch (formattedMessage) {
          case "ontheprodidfield":
          case "productid":
            return "Product ID";
          case "product_id_old":
            return "Product_ID_OLD";
          case "productaltnum":
            return "ProductALTNUM";
          default:
            return "Product ID";
        }
      };
      const SQl_Discriptipn = {
        description: `This query joins the Products table with [${variables?.[0]?.id}] on the [${variables?.[1]?.id}] field, and filters for products where the current stock level is below the reorder level. [${variables?.[2]?.id}] Finally, it includes the reorder level and the current stock level in the result set. \nNote that the Goods table is a table that stores the stock in and out for each product, with separate fields for the quantity and the date. The Stock field is calculated as the difference between the In and Out fields, and the ReorderLevel field is a threshold value that triggers a reorder when the stock level falls below it.`,
        sql: `SELECT
        Products.ID,
        Products.Product,
        Products.Description,
        Products.Price,
        Products.Category,
        Products.Supplier,
        Goods.Stock,
        Goods.ReorderLevel,
        MAX(
          CASE
            WHEN Goods.Stock >= Products.ReorderLevel THEN Goods.Date
          END
        ) AS LastDateAboveThreshold
      FROM
        Products
        INNER JOIN Goods ON Products.ID = Goods.${product_category(variables?.[1]?.value)}
      WHERE
        Goods.Stock < Products.ReorderLevel
      GROUP BY
        Products.ID,
        Products.Product,
        Products.Description,
        Products.Price,
        Products.Category,
        Products.Supplier,
        Goods.Stock,
        Goods.ReorderLevel;`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567893": {
      const region_x = (value: any) => {
        const formattedMessage = value.replace(/ /g, "").toLowerCase();
        switch (formattedMessage) {
          case "regionn":
            return "N";
          case "regiono":
            return "O";
          case "regionp":
            return "P";
          case "regionq":
            return "Q";
          case "regionr":
            return "R";
          case "regions":
            return "S";
          case "regiont":
            return "T";
          case "regionu":
            return "U";
          case "regionv":
            return "V";
          case "regionw":
            return "W";
          case "regionx":
            return "X";
          case "regiony":
            return "Y";
          case "regionz":
            return "Z";
          default:
            return "";
        }
      };

      const SQl_Discriptipn = {
        description: ` The query calculates and compares daily unit and dollar sales volumes for '[${variables?.[0]?.id}]' products and other products in [${variables?.[1]?.id}] over the [${variables?.[2]?.id}]. First, it filters sales_data for '[${variables?.[0]?.id}]' products in [${variables?.[1]?.id}] from the last week, grouping by date to calculate total order value and units sold. Then, it Filters sales_data for all other products in [${variables?.[1]?.id}] from the last week, grouping by date to calculate total order value and units sold. Finally, it Joins star_sales and other_sales on sale date, and calculates total and [${variables?.[3]?.id}] for both categories. The result is a table showing daily sales volumes for '[${variables?.[0]?.id}]' products versus “all other” products in [${variables?.[1]?.id}], allowing for performance comparison over the past week.`,
        sql: `WITH
        star_sales AS (
          SELECT
            EXTRACT(
              DAY
              FROM
                sale_date
            ) AS sale_day,
            EXTRACT(
              MONTH
              FROM
                sale_date
            ) AS sale_month,
            EXTRACT(
              YEAR
              FROM
                sale_date
            ) AS sale_year,
            product_id,
            SUM(order_value) AS daily_order_value,
            SUM(units_sold) AS daily_units_sold
          FROM
            sales_data
          WHERE
            product_category LIKE '%${variables?.[0]?.value}%'
            AND region = '${region_x(variables?.[1]?.value)}'
            AND sale_date >= CURRENT_DATE - INTERVAL '${region_x(variables?.[2]?.value)}'
          GROUP BY
            EXTRACT(
              DAY
              FROM
                sale_date
            ),
            EXTRACT(
              MONTH
              FROM
                sale_date
            ),
            EXTRACT(
              YEAR
              FROM
                sale_date
            ),
            product_id
        ),
        other_sales AS (
          SELECT
            EXTRACT(
              DAY
              FROM
                sale_date
            ) AS sale_day,
            EXTRACT(
              MONTH
              FROM
                sale_date
            ) AS sale_month,
            EXTRACT(
              YEAR
              FROM
                sale_date
            ) AS sale_year,
            product_id,
            SUM(order_value) AS daily_order_value,
            SUM(units_sold) AS daily_units_sold
          FROM
            sales_data
          WHERE
            product_category NOT LIKE '%${variables?.[0]?.value}%'
            AND region = '${region_x(variables?.[1]?.value)}'
            AND sale_date >= CURRENT_DATE - INTERVAL '${region_x(variables?.[2]?.value)}'
          GROUP BY
            EXTRACT(
              DAY
              FROM
                sale_date
            ),
            EXTRACT(
              MONTH
              FROM
                sale_date
            ),
            EXTRACT(
              YEAR
              FROM
                sale_date
            ),
            product_id
        )
      SELECT
        s.sale_day,
        s.sale_month
        `,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567894": {
      const SQl_Discriptipn = {
        description: `A list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made [${variables?.[0]?.id}] or more orders.`,
        sql: `with customers as (select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`), orders as (select id as order_id, user_id as customer_id, order_date, status from \`helical-math-378821\`.\`shop\`.\`orders\`), customer_orders as (select customer_id, min(order_date) as first_order_date, max(order_date) as last_order_date, count(order_id) as order_count from orders group by 1), final as (select customers.customer_id, customers.first_name, customers.last_name, customer_orders.first_order_date, customer_orders.last_order_date, coalesce(customer_orders.order_count, 0) as order_count from customers left join customer_orders using (customer_id)) select * from final where order_count >= ${variables?.[0]?.value}`,
      };
      return SQl_Discriptipn;
    }
    case "query#1234567895": {
      const last_interaction_timestamp = (value: any) => {
        const formattedMessage = value.replace(/ /g, "").toLowerCase();
        console.log(formattedMessage, "formattedMessage", value);
        if (formattedMessage === "lastinteraction") {
          return "last_interaction_timestamp";
        } else return value;
      };
      const SQl_Discriptipn = {
        description: `This query first selects distinct customer IDs, email addresses, and [${variables?.[0]?.id}] timestamps from both the Segment and Lytics tables, and sums up the total transactions from both tables. It then filters the results based on membership in Wawa's loyalty program and whether a purchase or redemption was made in the past week. Finally, it merges the two lists.`,
        sql: `SELECT DISTINCT 
        s.customer_id,
        s.email,
        s.${last_interaction_timestamp(variables?.[0]?.value)},
        COALESCE(s.total_transactions, 0) + COALESCE(l.total_transactions, 0) AS total_transactions
    FROM 
        (
            SELECT 
                customer_id,
                email,
                MAX(${last_interaction_timestamp(variables?.[0]?.value)}) AS ${last_interaction_timestamp(variables?.[0]?.value)},
                COUNT(*) AS total_transactions
            FROM 
                Segment
            WHERE 
                loyalty_status = 'Wawa Rewards Member' 
                AND (purchase_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK) OR redemption_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK))
            GROUP BY 
                customer_id,
                email
        ) s
    LEFT JOIN 
        (
            SELECT 
                customer_id,
                email,
                MAX(${last_interaction_timestamp(variables?.[0]?.value)}) AS ${last_interaction_timestamp(variables?.[0]?.value)},
                COUNT(*) AS total_transactions
            FROM 
                Lytics
            WHERE 
                loyalty_program = 'Wawa' 
                AND (purchase_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK) OR redemption_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK))
            GROUP BY 
                customer_id,
                email
        ) l
    ON 
        s.customer_id = l.customer_id 
        AND s.email = l.email;`,
      };
      return SQl_Discriptipn;
    }
    default:
      const SQl_Discriptipn = {
        description: `Show me a list of customers with their first order date, last order date, and order count, along with any additional information from the merged shop data, for customers who have made ${variables?.[0]?.value} or more orders.`,
        sql: `select * from \`dbt-tutorial\`.jaffle_shop.customers\nselect * from \`dbt-tutorial\`.jaffle_shop.orders\nwith\n    customers as (\n        select id as customer_id, first_name, last_name from \`helical-math-378821\`.\`shop\`.\`customers\`\n    ),\n    orders as (\n        select id as order_id, user_id as customer_id, order_date, status\n        from \`helical-math-378821\`.\`shop\`.\`orders\`\n    ),\n    customer_orders as (\n        select\n            customer_id,\n            min(order_date) as first_order_date,\n            max(order_date) as last_order_date,\n            count(order_id) as order_count\n        from orders\n        group by 1\n    ),\n    final as (\n        select\n            customers.customer_id,\n            customers.first_name,\n            customers.last_name,\n            customer_orders.first_order_date,\n            customer_orders.last_order_date,\n            coalesce(customer_orders.order_count, 0) as order_count\n        from customers\n        left join customer_orders using (customer_id)\n    )\nselect *\nfrom final\nselect * from \`helical-math-378821\`.\`shop\`.\`merge\`\nwhere order_count >= ${variables?.[0]?.value}.0`,
      };
      return SQl_Discriptipn;
  }
};
