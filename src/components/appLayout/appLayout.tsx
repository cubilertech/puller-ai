import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
import TopNavBar from "../TopNavBar/topNavBar";
import { InputArea } from "../inputArea";
import { PageHeader } from "../PageHeader";

interface MyComponentProps {
  children: ReactNode;
}

const AppLayout: FC<MyComponentProps> = ({ children }) => {
  return (
    <Box
      sx={{
        marginLeft: "240px",
        minHeight: "100vh",
      }}
    >
      <TopNavBar />
      {children}
    </Box>
  );
};

export default AppLayout;
