import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import Summary from "@/components/Summary/summary";
import DataTable from "@/components/table/table";
import { FC } from "react";

const PreviewDataPage: FC = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        height: "calc(100vh - 200px)",
      }}
    >
      <PageHeader type="Preview" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          gap: "1.5rem",
          mt: "1rem",
        }}
      >
        <Summary
          heading="Summary"
          description="This query uses a table called Transactions that contains the following columns:
SKU, Store_ID, Product_Contains_Element_X, Transaction_Amount, and Transaction_Date. The Product_Contains_Element_X column is a boolean that indicates whether the product contains Element X. The Transaction_Date column stores the date of the transaction.
The WHERE clause filters the transactions to only include those from the last three quarters, and those from stores in North America. It also includes only those transactions for products that contain Element X.
The GROUP BY clause groups the transactions by SKU, Store ID, quarter, and year, and calculates the sum of the transaction amounts for each group.
Finally, the ORDER BY clause sorts the results by SKU, Store ID, year, and quarter, in descending order. This will give you the most recent quarter first, followed by the previous quarter, and so on. "
        />

        <Paper type="light-border">
          <DataTable />
        </Paper>
      </Box>
    </Box>
  );
};
export default PreviewDataPage;
