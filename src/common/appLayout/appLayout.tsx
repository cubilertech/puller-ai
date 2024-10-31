"use client";
import React, { ReactNode } from "react";
import { SideNavbar } from "@/components/SideNavbar";
import "./appLayout.css";
import { TopNavBar } from "@/components/TopNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isPilotMode, toastTimeout } from "@/utils/constants";
import { CustomHooks } from "../../hooks/CustomHooks";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="app-layout">
      {isPilotMode && <CustomHooks />}
      <div className="sidebar">
        <SideNavbar />
      </div>
      <div className="right-container">
        <div className="topbar">
          <TopNavBar />
        </div>
        <div className="content">
          <div className="children-container">
            <ToastContainer
              position="top-right"
              autoClose={toastTimeout}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
