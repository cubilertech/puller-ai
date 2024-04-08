import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import TopNavBar from "../../components/TopNavBar/topNavBar";
import { InputArea } from "../../components/inputArea";
import { PageHeader } from "../../components/PageHeader";
import { SideNavbar } from "@/components/SideNavbar";

import "./appLayout.css";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-layout">
      <div className="sidebar">
        <SideNavbar />
      </div>
      <div className="topbar">
        <TopNavBar />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default AppLayout;
