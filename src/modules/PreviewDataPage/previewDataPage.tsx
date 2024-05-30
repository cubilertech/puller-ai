import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import DataTable from "@/components/table/table";
import { FC, useEffect, useMemo, useState } from "react";
import { Summary } from "@/components/Summary";
import { DUMMY_SUMMARY } from "@/utils/constants";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import { Loader } from "@/components/Loader";
import { Prompt } from "@/utils/types";
import { replaceIdWithVariableInDiscription } from "@/utils/common";

interface PreviewDataPageProps {
  id?: string;
}

const PreviewDataPage: FC<PreviewDataPageProps> = ({ id }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: PromptData, refetch: refetchSignleExecute } =
    useGetSinglePrompt(id as string);
  useEffect(() => {
    if (PromptData && PromptData?.status === "complete") {
      setIsLoading(false);
      // Trigger fade-in effect after component mounts
      setFadeIn(true);
    } else {
      refetchSignleExecute();
    }
  }, [PromptData, refetchSignleExecute]);
  const discription = useMemo(() => {
    return replaceIdWithVariableInDiscription(PromptData as Prompt);
  }, [PromptData]);
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
            padding: "1rem",
            height: "calc(100vh - 150px)",
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <PageHeader title="Preview" />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 4fr",
              gap: "1.5rem",
              mt: "1rem",
              height: "100%",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Summary heading="Summary" description={discription} />

            <Paper variant="light-border">
              <DataTable data={PromptData as Prompt} />
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};
export default PreviewDataPage;
