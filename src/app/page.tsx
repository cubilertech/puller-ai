import Button from "@/components/Button/Button";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage";
import Image from "next/image";
import Paper from "@/components/Paper/paper";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { SideNavbar } from "@/components/SideNavbar";
import { Box } from "@mui/material";
import { IconButton } from "@/components/IconButton";
import Logo from "@/components/logo/logo";
import { InputArea } from "@/components/inputArea";
import AppLayout from "@/common/appLayout/appLayout";
import Tooltip from "@/components/Tooltip/tooltip";

export default function Home() {
  return (
    <>
      <AppLayout>
        {/* <CreateRequestPage /> */}

        <Tooltip
          title="test"
          description="tooltip test data this is a description"
        >
          <Box>test</Box>
        </Tooltip>
      </AppLayout>
    </>
  );
}
