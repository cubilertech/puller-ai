import React, { ReactNode } from "react";
import TopNavBar from "../../components/TopNavBar/topNavBar";
import { SideNavbar } from "@/components/SideNavbar";

import "./appLayout.css";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-layout">
      <div className="sidebar">
        <SideNavbar />
      </div>
      <div className="right-container">
        <div className="topbar">
          <TopNavBar />
        </div>
        <div className="content">
          <div className="children-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
