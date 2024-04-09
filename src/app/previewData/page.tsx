import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { SideNavbar } from "@/components/SideNavbar";
import Summary from "@/components/Summary/summary";
import AppLayout from "@/components/appLayout/appLayout";
import DataTable from "@/components/table/table";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const PreviewData = () => {
  return (
    <>
      <SideNavbar />
      <AppLayout>
        <Box p={"2rem"}>
          <PageHeader />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              gap: "1.5rem",
              mt: "1rem",
            }}
          >
            <Summary
              heading="test heading"
              description="this is a description "
            />

            <Paper type="light-border">
              <DataTable />
            </Paper>
          </Box>
        </Box>
      </AppLayout>
    </>
  );
};

export default PreviewData;
