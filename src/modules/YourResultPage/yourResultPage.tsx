"use client";
import { NotesList } from "@/components/NotesList";
import { PageHeader } from "@/components/PageHeader";
import { ResultCard } from "@/components/ResultCard";
import { RESULTS_DATA } from "@/utils/data";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

const YourResultsPage: FC = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect after component mounts
    setFadeIn(true);
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "98%",
          m: "auto",
          mt: 1,
          // Apply fade-in effect using CSS transition
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <PageHeader type="Results" />

        <Box sx={{ display: "flex", gap: 2, pt: 3, width: "100%" }}>
          <ResultCard data={RESULTS_DATA} />
          <NotesList />
        </Box>
      </Box>
    </>
  );
};
export default YourResultsPage;
