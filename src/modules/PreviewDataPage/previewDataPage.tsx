import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import DataTable from "@/components/table/table";
import { FC } from "react";
import { Summary } from "@/components/Summary";
import { DUMMY_SUMMARY } from "@/utils/constants";

const PreviewDataPage: FC = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        height: "calc(100vh - 150px)",
      }}
    >
      <PageHeader title="Preview" />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
          gap: "1.5rem",
          mt: "1rem",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Summary heading="Summary" description={DUMMY_SUMMARY} />

        <Paper variant="light-border">
          <DataTable />
        </Paper>
      </Box>
    </Box>
  );
};
export default PreviewDataPage;
