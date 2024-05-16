"use client";
import { Loader } from "@/components/Loader";
import { NotesList } from "@/components/NotesList";
import { PageHeader } from "@/components/PageHeader";
import { ResultCard } from "@/components/ResultCard";
import { useGetSingleExecute } from "@/hooks/useExecute";
// import { getActiveRequest } from "@/libs/redux/features/activeRequest";
// import { useAppSelector } from "@/libs/redux/hooks";
import { RESULTS_DATA } from "@/utils/data";
import { Box } from "@mui/material";
// import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface Props {
  id: string;
}

const YourResultsPage: FC<Props> = ({ id }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data, refetch: refetchSignleExecute } = useGetSingleExecute(id);
  useEffect(() => {
    if (data && data?.status === "complete") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setFadeIn(true);
    } else {
      refetchSignleExecute();
    }
  }, [data, refetchSignleExecute]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "60%", height: "70%" }}>
            <Loader type="Processing" variant="paper" />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: "98%",
            m: "auto",
            mt: 1,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1s ease",
            px: 0.5
          }}
        >
          <PageHeader title="Your Results" />

          <Box sx={{ display: "flex", gap: 2, pt: 3, width: "100%" }}>
            <ResultCard
              data={{
                ...RESULTS_DATA,
                fileLink: (data?.results[0]?.url as string) ?? "",
              }}
            />
            <NotesList />
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourResultsPage;
