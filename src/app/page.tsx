import Paper from "@/components/Paper/paper";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <TopNavBar />

      <Paper type="dark-border">
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
        <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
      </Paper>
    </>
  );
}
