import TopNavBar from "@/components/TopNavBar/topNavBar";
import { SideNavbar } from "@/components/SideNavbar";
import RecentRequestPage from "@/modules/RecentRequestPage/recentRequestPage";
import { Box } from "@mui/material";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";

export default function YourResults() {
  return (
    <AppLayout>
      <YourResultsPage />
    </AppLayout>
  );
}
