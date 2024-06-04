"use client";
import { Loader } from "@/components/Loader";
import { NotesList } from "@/components/NotesList";
import { PageHeader } from "@/components/PageHeader";
import { ResultCard } from "@/components/ResultCard";
import { useGetSingleExecute } from "@/hooks/useExecute";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import {
  replaceBrandName,
  replaceIdWithVariableInDescription,
} from "@/utils/common";
import { CURRENT_MODE, MODES } from "@/utils/constants";
// import { getActiveRequest } from "@/libs/redux/features/activeRequest";
// import { useAppSelector } from "@/libs/redux/hooks";
import { RESULTS_DATA } from "@/utils/data";
import { Prompt } from "@/utils/types";
import { Box } from "@mui/material";
// import { useParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

interface Props {
  id: string;
}

const YourResultsPage: FC<Props> = ({ id }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const singleExecute = useGetSingleExecute(id);
  const singlePrompt = useGetSinglePrompt(id);
  
  const { data, refetch: refetchSignleExecute } =
    CURRENT_MODE === MODES.PILOT
      ? singleExecute
      : singlePrompt;
  useEffect(() => {
    if (data && data?.status === "complete") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setFadeIn(true);
    } else {
      refetchSignleExecute();
    }
  }, [data, refetchSignleExecute]);
  const imageUrl =
    data?.results && data.results[0]?.url ? data.results[0].url : "";
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  // const discription = useMemo(() => {
  //   return replaceIdWithVariableInDiscription(data as Prompt);
  // }, [data]);
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
            <Loader type="Loading" variant="paper" />
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
                main_description: data?.query
                  ? data?.query
                  : RESULTS_DATA.main_description,
                fileSize:
                  data?.results && data?.results[0].bytes
                    ? data?.results[0].bytes
                    : RESULTS_DATA.fileSize,
                id: data?.id ?? "",
                observations:
                  data?.observations !== ""
                    ? replaceBrandName({
                        description: data?.observations as string,
                      })
                    : RESULTS_DATA.observations,
                fileLink: imageUrl,
              }}
            />
            <NotesList List={data?.notes} />
          </Box>
        </Box>
      )}
    </>
  );
};
export default YourResultsPage;
