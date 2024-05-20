"use client";
import { PageHeader } from "@/components/PageHeader";
import { RetriverCard } from "@/components/RetriverCard";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { RETRIEVER_DATA } from "@/utils/data";
import { Box } from "@mui/material";
import { useState } from "react";

const RetrieversPage = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleSingleAlert = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader
        title="Retrievers"
        buttons={[
          {
            label: "Create Retriever",
            variant: "outlined",
            href: "/retrievers/new",
            width: 220,
          },
        ]}
      />
      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          alignItems: "flex-start",
          justifyItems: "center",
          width: "100%",
          height: "fit-content",
          gap: "1rem",
          justifyContent: "space-between",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {RETRIEVER_DATA.map((card, i) => (
          <RetriverCard
            description={card.description}
            icon={card.icon}
            status={card.status}
            onClick={() => handleSingleAlert()}
            title={card.title}
            key={i}
          />
        ))}
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default RetrieversPage;
