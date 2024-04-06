import TopNavBar from "@/components/TopNavBar/topNavBar";
import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { SideNavbar } from "@/components/SideNavbar";
import AppLayout from "@/components/appLayout/appLayout";
import { InputArea } from "@/components/inputArea";

export default function CreateRequest() {
  return (
    <Box>
      <SideNavbar />
      <AppLayout>
        <Box
          sx={{
            padding: "1rem 2rem 1rem",
          }}
        >
          <PageHeader />
          <InputArea />
        </Box>
      </AppLayout>
    </Box>
  );
}
