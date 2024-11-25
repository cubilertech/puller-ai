"use client";
import { Icon } from "@/components/Icon";
import { Loader } from "@/components/Loader";
import { NotesList } from "@/components/NotesList";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { ResultCard } from "@/components/ResultCard";
import { useGetSingleExecute } from "@/hooks/useExecute";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import { setSubmitExecuteLoading } from "@/libs/redux/features/globalLoadings";
import { useAppDispatch } from "@/libs/redux/hooks";
import { palette } from "@/theme/Palette";
import { isPilotMode } from "@/utils/constants";
// import { getActiveRequest } from "@/libs/redux/features/activeRequest";
// import { useAppSelector } from "@/libs/redux/hooks";
import { RESULTS_DATA } from "@/utils/data";
import { Query } from "@/utils/types";
import { Box, Typography } from "@mui/material";
// import { useParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

interface Props {
  id: string;
}

const YourResultsPage: FC<Props> = ({ id }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();
  const {
    data,
    refetch: refetchSingleExecute,
    isFetching: isFetchingExicute,
  } = useGetSingleExecute(id);

  const {
    data: PromptData,
    refetch: refetchPromptData,
    isFetching,
  } = useGetSinglePrompt((data as Query)?.prompt ?? "");

  useEffect(() => {
    if (data && data?.status === "complete") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setFadeIn(true);
    } else if (data && data?.status === "failed") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setIsError(true);
      setFadeIn(true);
    } else {
      setTimeout(() => {
        refetchSingleExecute();
      }, 3000);
    }
  }, [data?.status, isFetchingExicute == false, refetchSingleExecute]);

  const imageUrl =
    data?.results && data.results[data.results.length - 1]?.url
      ? data.results[data.results.length - 1].url
      : "";
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    dispatch(setSubmitExecuteLoading(false));
  }, []);
  useEffect(() => {
    if ((data as Query)?.prompt) {
      refetchPromptData();
    }
  }, [(data as Query)?.prompt]);

  const PrmomptFormatedData = (PromptData as Query) ?? (data as Query);
  return (
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "60%", height: "100%", overflow: "hidden" }}>
            <Loader
              variant="pageLoader"
              message="Hold on, we're getting your results"
            />
          </Box>
        </Box>
      ) : isError ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            variant="light-bg-border"
            sx={{
              width: "700px",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Icon width={186} height={63} icon="emptyTableIcon" />
              <Typography sx={{ fontSize: 32, fontWeight: "bold" }}>
                Oops!
              </Typography>
              <Typography
                variant="text-sm-regular"
                sx={{ color: palette.color.gray[300] }}
              >
                We couldn’t complete your request
              </Typography>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box
          sx={{
            width: "98%",
            m: "auto",
            mt: 1,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1s ease",
            px: 0.5,
          }}
        >
          <PageHeader title="Your Results" />

          <Box sx={{ display: "flex", gap: 2, pt: 3, width: "100%" }}>
            <ResultCard
              data={{
                ...RESULTS_DATA,
                fileTimestamps: formattedDate ?? RESULTS_DATA.fileTimestamps,
                fileStructured:
                  data?.results && data?.results[0]
                    ? data.results[0].database
                    : RESULTS_DATA.fileStructured,
                main_description: PrmomptFormatedData?.message
                  ? PrmomptFormatedData?.message
                  : RESULTS_DATA.main_description,
                fileSize:
                  data?.results && data?.results[0].bytes
                    ? data?.results[0].bytes
                    : RESULTS_DATA.fileSize,
                id: data?.id ?? "",
                observations: PrmomptFormatedData.description
                  ? PrmomptFormatedData?.description
                  : RESULTS_DATA.observations,
                fileLink: imageUrl,
              }}
            />
            {/* <NotesList List={data?.notes} /> */}
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourResultsPage;
