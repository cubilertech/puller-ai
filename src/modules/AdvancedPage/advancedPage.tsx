"use client";
import { PageHeader } from "@/components/PageHeader";
import { RectangleCard } from "@/components/RectangleCard";
import { AlertModal } from "@/modals/AlertModal";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { Box } from "@mui/material";
import { useState } from "react";

const AdvancedPage = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleClick = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    }
  };
  return (
    <Box p={"1rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader title="Advanced" />
      {/* Card Container */}
      <Box
        display={"flex"}
        gap={"2rem"}
        flexDirection={{ md: "row", xs: "column" }}
      >
        <RectangleCard
          icon="apiKey"
          title="Advanced Analytics"
          onClick={() => handleClick()}
        />
        <RectangleCard
          icon="connectApps"
          title="Connect to App or Dashboard"
          onClick={() => handleClick()}
        />
        <RectangleCard
          icon="cpu"
          title="Connect to AI Model"
          onClick={() => handleClick()}
        />
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default AdvancedPage;
