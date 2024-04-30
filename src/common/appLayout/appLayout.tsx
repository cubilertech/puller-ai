import React, { ReactNode } from "react";
import { SideNavbar } from "@/components/SideNavbar";
import "./appLayout.css";
import { TopNavBar } from "@/components/TopNavBar";
import TanstackProvider from "@/providers/TanstackProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";

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
          <div className="children-container">
            <TanstackProvider>
            <ReduxProvider>
              {children}
            </ReduxProvider>
            </TanstackProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
