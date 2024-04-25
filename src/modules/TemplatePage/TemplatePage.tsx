"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import React, { useState } from "react";
import TemplateTopbar from "@/components/TemplateTopbar/templateTopbar";
import TemplateCardList from "@/components/TemplateCardList/templateCardList";

const TemplatePage = () => {
  const [isActive, setIsActive] = useState("public");

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      px={"1rem"}
      pt={"1.5rem"}
      gap={"1.5rem"}
      height={"100%"}
    >
      <PageHeader type="Template" />

      {/* Table Container */}
      <Box height={"85%"}>
        <Paper
          sx={{
            padding: "1.5rem",
            height: "100%",
            paddingBottom: "1rem",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
          type="light-border"
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
