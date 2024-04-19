"use client";
import { PageHeader } from "@/components/PageHeader";
import RectangleCardWithIcon from "@/components/RectangleCardWithIcon/rectangleCardWithIcon";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const CreateNewRetriverPage = () => {
  const router = useRouter();
  return (
    <Box p={"2rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader type="New Retriver" />
      <Box display={"flex"} gap={"2rem"}>
        <RectangleCardWithIcon
          icon="connectApps"
          title="Connect Apps"
          onClick={() => router.push("/retrivers/connect")}
        />
        <RectangleCardWithIcon icon="apiKey" title="Get API Key" />
        <RectangleCardWithIcon icon="upload" title="Uplaod Data" />
      </Box>
    </Box>
  );
};

export default CreateNewRetriverPage;
