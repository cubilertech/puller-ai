"use client";
import { Loader } from "@/components/Loader";
import { NotesList } from "@/components/NotesList";
import { PageHeader } from "@/components/PageHeader";
import { ResultCard } from "@/components/ResultCard";
import { useGetQueryStatus } from "@/hooks/useRequest";
import { getActiveRequest } from "@/libs/redux/features/activeRequest";
import { useAppSelector } from "@/libs/redux/hooks";
import { RESULTS_DATA } from "@/utils/data";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

const YourResultsPage: FC = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const activeRequest = useAppSelector(getActiveRequest);
  const { data, refetch: refetchQuerySatus } = useGetQueryStatus(
    activeRequest?.id
  );

  // useEffect(() => {
  //   refetchQuerySatus();
  //   setIsLoading(false);
  //   // setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 4000);
  // }, []);
  useEffect(() => {
    if (data && data?.status === "complete") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setFadeIn(true);
    } else {
      refetchQuerySatus();
    }
  }, [data]);

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
          }}
        >
          <PageHeader title="Your Results" />

          <Box sx={{ display: "flex", gap: 2, pt: 3, width: "100%" }}>
            <ResultCard data={{...RESULTS_DATA,fileLink:data?.result}} />
            <NotesList />
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourResultsPage;
