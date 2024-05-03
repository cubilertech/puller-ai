"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { ACTIVE_TYPES } from "@/utils/constants";
import { TemplateCardList } from "@/components/TemplateCardList";
import { TemplateTopbar } from "@/components/TemplateTopbar";

const TemplatePage = () => {
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.PUBLIC);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      px={"1rem"}
      pt={"1.5rem"}
      gap={"1.5rem"}
      height={"100%"}
    >
      <PageHeader title="Pulls Inventory" />

      {/* Table Container */}
      <Box height={"88%"}>
        <Paper
          sx={{
            padding: "1.5rem",
            height: "100%",
            paddingY: "1.2rem",
            display: "flex",
            flexDirection: "column",
          }}
          variant="light-border"
        >
          {/* Topbar */}
          <TemplateTopbar isActive={isActive} setIsActive={setIsActive} />

          {/* Card List */}
          <TemplateCardList isActive={isActive} />
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
