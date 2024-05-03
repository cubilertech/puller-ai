import React, { ReactNode } from "react";
import { SideNavbar } from "@/components/SideNavbar";
import "./appLayout.css";
import { TopNavBar } from "@/components/TopNavBar";
import TanstackProvider from "@/providers/TanstackProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { ThemeProvider } from "@mui/material";
import { customTheme } from "@/theme/CustomTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer
              position="top-right"
              autoClose={5000}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <ThemeProvider theme={customTheme}>
              <TanstackProvider>
                <ReduxProvider>{children}</ReduxProvider>
              </TanstackProvider>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
