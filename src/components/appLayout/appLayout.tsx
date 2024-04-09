import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import TopNavBar from "../TopNavBar/topNavBar";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "../PageHeader";

interface MyComponentProps {
  children: ReactNode;
}

const AppLayout: FC<MyComponentProps> = () => {
  return (
    <Box
      sx={{
        marginLeft: "240px",
        minHeight: "100vh",
      }}
    >
      <TopNavBar />
      <Box
        sx={{
          padding: "1rem 2rem 1rem",
        }}
      >
        <PageHeader type="create" />
        <PannelArea />
      </Box>
    </Box>
  );
};

export default AppLayout;
