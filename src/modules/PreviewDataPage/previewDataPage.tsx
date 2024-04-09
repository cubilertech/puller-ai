import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

const PreviewDataPage: FC = () => {
  return (
    <>
      <Box
        sx={{
          p: "2rem",
        }}
      >
        <PageHeader type="Preview" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "1.5rem",
            mt: "1rem",
          }}
        >
          <Paper
            type="light-border"
            sx={{
              padding: "1rem",
              alignSelf: "stretch",
            }}
          >
            <Typography variant="text-md-semibold"> Summary</Typography>
            <br />
            <Typography variant="text-sm-regular">
              "This query first selects distinct customer IDs, email addresses,
              and last interaction timestamps from both the Segment and Lytics
              tables, and sums up the total transactions from both tables.
              <br /> Itthen filters the results based on membership in Wawa's
              loyalty program and whether a purchase or redemption was made in
              the past week. Finally, it merges the two lists, deduplicating
              line items by Customer ID"
            </Typography>
          </Paper>
          <Paper type="light-border"></Paper>
        </Box>
      </Box>
    </>
  );
};
export default PreviewDataPage;
