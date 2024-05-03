import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const response = {
      id: "abcd",
      target: "model2",
      description: "aasdas",
      sql: "SELECT Store_ID, DATE_TRUNC(TXN_DATE, 'week') AS Week, SUM(TXN_AMT) AS Total_Sales FROM TXN_SZNAL WHERE PROD_ID IN (1234, 5678) GROUP BY PROD_ID IN (1234, 5678) ORDER BY Week",
      graph: [
        {
          id: "model0",
          name: "get customers",
          description: "get all customer profiles",
          depends: [],
        },
        {
          id: "model1",
          name: "get orders",
          description: "get all product orders",
          depends: [],
        },
        {
          id: "model2",
          name: "top customers",
          description: "filter and return top spending customers",
          depends: ["model0", "model1"],
        },
      ],
      variables: [
        {
          id: "var0",
          name: "number of top customers",
          type: "int",
          value: 100,
          model: "model2",
        },
      ],
    };
    // console.log(response, "response");
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
