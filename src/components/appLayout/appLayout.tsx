import { Box } from "@mui/material";
import React from "react";
import TopNavBar from "../TopNavBar/topNavBar";
import Logo from "../logo/logo";
import { InputArea } from "../inputArea";

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
        <InputArea />
      </Box>
    </Box>
  );
};

export default AppLayout;
