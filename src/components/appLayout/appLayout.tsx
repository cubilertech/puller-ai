import { Box } from "@mui/material";
import React from "react";
import TopNavBar from "../TopNavBar/topNavBar";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "../PageHeader";

const AppLayout = () => {
  return (
    <Box
      sx={{
        marginLeft: "240px",
      }}
    >
      <TopNavBar />
      <Box
        sx={{
          padding: "1rem 2rem 1rem",
        }}
      >
        <PageHeader />
        <PannelArea />
      </Box>
    </Box>
  );
};

export default AppLayout;
