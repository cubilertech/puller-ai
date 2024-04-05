import Button from "@/components/Button/Button";
import CreateRequestPage from "@/modules/createRequestPage/CreateRequestPage";
import Image from "next/image";
import Paper from "@/components/Paper/paper";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { SideNavbar } from "@/components/SideNavbar";
import { Box } from "@mui/material";
import { IconButton } from "@/components/IconButton";
import Logo from "@/components/logo/logo";
import { InputArea } from "@/components/inputArea";
import AppLayout from "@/components/appLayout/appLayout";

export default function Home() {
  return (
    <>
      <SideNavbar />
      <AppLayout />
    </>
  );
}
