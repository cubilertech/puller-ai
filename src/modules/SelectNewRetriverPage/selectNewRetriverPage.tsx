"use client";
import { PageHeader } from "@/components/PageHeader";
import RectangleCardWithIcon from "@/components/RectangleCardWithIcon/rectangleCardWithIcon";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const SelectNewRetriverPage = () => {
  const router = useRouter();
  return (
    <Box p={"1rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader type="New Retriver" />
      <Box display={"flex"} gap={"2rem"}>
        <RectangleCardWithIcon
          icon="connectApps"
          title="Connect Apps"
          onClick={() => router.push("/retrievers/connect")}
        />
        <RectangleCardWithIcon icon="apiKey" title="Get API Key" />
        <RectangleCardWithIcon
          icon="upload"
          title="Uplaod Data"
          onClick={() => router.push("/retrievers/upload")}
        />
      </Box>
    </Box>
  );
};

export default SelectNewRetriverPage;
