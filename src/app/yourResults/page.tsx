import TopNavBar from "@/components/TopNavBar/topNavBar";
import { SideNavbar } from "@/components/SideNavbar";
import RecentRequestPage from "@/modules/RecentRequestPage/recentRequestPage";
import { Box } from "@mui/material";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";

export default function YourResults() {
  return (
    <Box>
      <TopNavBar />
      <SideNavbar />
      <Box ml={35}>
        <YourResultsPage />
      </Box>
    </Box>
  );
}
