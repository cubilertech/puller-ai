"use client";
import { PageHeader } from "@/components/PageHeader";

import { RectangleCard } from "@/components/RectangleCard";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const SelectNewRetriverPage = () => {
  const router = useRouter();
  return (
    <Box p={"1rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader title="Select New Retriever Type" />
      {/*Layout Container */}
      <Box
        display={"flex"}
        gap={"2rem"}
        flexDirection={{ md: "row", xs: "column" }}
      >
        <RectangleCard
          icon="connectApps"
          title="Connect Apps"
          onClick={() => router.push("/retrievers/connect")}
        />
        <RectangleCard icon="apiKey" title="Get API Key" />
        <RectangleCard
          icon="upload"
          title="Uplaod Data"
          onClick={() => router.push("/retrievers/upload")}
        />
      </Box>
    </Box>
  );
};

export default SelectNewRetriverPage;
