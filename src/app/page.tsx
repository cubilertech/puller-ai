import { Box } from "@mui/material";
import Tooltip from "@/components/Tooltip/tooltip";
import AppLayout from "@/common/AppLayout/appLayout";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage";

export default function Home() {
  return (
    <>
      <AppLayout>
        <CreateRequestPage />
      </AppLayout>
    </>
  );
}
