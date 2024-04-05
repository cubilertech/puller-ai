import { Loader } from "@/components/Loader";
import Paper from "@/components/Paper/paper";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Loader varient="paper" />
      <Loader varient="simple" />
    </>
  );
}
