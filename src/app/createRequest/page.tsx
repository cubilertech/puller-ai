import TopNavBar from "@/components/TopNavBar/topNavBar";
import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { SideNavbar } from "@/components/SideNavbar";
import AppLayout from "@/components/appLayout/appLayout";

export default function CreateRequest() {
  return (
    <Box>
      <SideNavbar />
      <AppLayout />
    </Box>
  );
}
