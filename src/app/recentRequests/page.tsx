import TopNavBar from "@/components/TopNavBar/topNavBar";
import { PageHeader } from "@/components/PageHeader";
import { SideNavbar } from "@/components/SideNavbar";
import RecentRequestPage from "@/modules/RecentRequestPage/recentRequestPage";
import { Box } from "@mui/material";

export default function RecentRequests() {
  return (
    <Box>
      <SideNavbar />
      <TopNavBar />
      <Box ml={35}>
        <RecentRequestPage />
      </Box>
    </Box>
  );
}
