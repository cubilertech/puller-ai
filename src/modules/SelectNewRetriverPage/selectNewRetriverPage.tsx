"use client";
import { PageHeader } from "@/components/PageHeader";

import { RectangleCard } from "@/components/RectangleCard";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SelectNewRetriverPage = () => {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleApi = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };

  return (
    <>
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

          <RectangleCard
            icon="apiKey"
            title="Get API Key"
            onClick={() => handleApi()}
          />
          <RectangleCard
            icon="upload"
            title="Uplaod Data"
            onClick={() => router.push("/retrievers/upload")}
          />
        </Box>
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};

export default SelectNewRetriverPage;
