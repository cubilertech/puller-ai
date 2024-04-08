import { Box } from "@mui/material";
import React from "react";
import TopNavBar from "../TopNavBar/topNavBar";
import { InputArea } from "../inputArea";
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
        <PageHeader type="create" />
        <InputArea />
      </Box>
    </Box>
  );
};

export default AppLayout;
