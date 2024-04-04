import Button from "@/components/Button/Button";
import CreateRequestPage from "@/modules/createRequestPage/CreateRequestPage";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import Image from "next/image";
import Paper from "@/components/Paper/paper";
import TopNavBar from "@/components/TopNavBar/topNavBar";

export default function Home() {
  return (
    <>
      <Button variant="text" label="test" />
      {/* <CreateRequestPage /> */}
      {/* <TopNavBar /> */}

      {/* <Paper type="dark-border">
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
      </Paper> */}
    </>
  );
}
