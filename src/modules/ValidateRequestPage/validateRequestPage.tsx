"use client";
import { Box } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "@/components/PageHeader";
import { useSubmitExecute } from "@/hooks/useExecute";
import GraphModal2 from "@/modals/graphModals/graphModal2";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import { palette } from "@/theme/Palette";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSubmitValidate } from "@/hooks/useValidate";
import { Prompt } from "@/utils/types";
import { ResponseArea } from "@/components/ResponseArea";
import { QueryComponent } from "@/components/QuaryComponent";
import { useAppSelector } from "@/libs/redux/hooks";
import { getConsoleMessages, getCurrentPage, getIsLoadingPrompt } from "@/libs/redux/features/isLoadingRequest";
import { motion } from "framer-motion";
import { Loader } from "@/components/Loader";
interface Props { 
  id: string;
}
const ValidateRequestPage: FC<Props> = ({ id }) => {
  const [CurrentType, setCurrentType] = useState<"text" | "graph" | "SQL">(
    "text"
  );
  const CurrentPage = useAppSelector(getCurrentPage);
  const ConsoleMessages = useAppSelector(getConsoleMessages);
  const isLoadingPrompt = useAppSelector(getIsLoadingPrompt);
  const [isOpenSelectBar, setIsOpenSelectBar] = useState(false);
  const { mutate: submitExecute, isLoading: isLoadingExecute } =
    useSubmitExecute();
  const {
    data: validatedPrompt,
    mutate: submitValidate,
    isLoading: submitValidateLoading,
    isSuccess: submitValidateSuccess,
  } = useSubmitValidate();
  const { data: singlePrompt, refetch: refetchPrompt } = useGetSinglePrompt(id);

  const handleUpdate = () => {
    if (id) {
      submitExecute({ prompt: `query#${id}` });
    }
  };
  const prompt = useMemo(() => {
    if (submitValidateSuccess && validatedPrompt) {
      return validatedPrompt;
    } else {
      return singlePrompt;
    }
  }, [singlePrompt, submitValidateSuccess]);
  const handleOpenGraph = () => {
    setCurrentType("graph");
  };

  const handleOpenSQL_Editor = () => {
    setCurrentType("SQL");
  };
  const handleOpenTxt = () => {
    setCurrentType("text");
  };
  const handleCloseSelectBar = () => {
    setIsOpenSelectBar(false);
  };
  // const handleOpenSelectBar = () => {
  //   setIsOpenSelectBar(true);
  // };
  useEffect(() => {
    if (id) {
      refetchPrompt();
    }
  }, [refetchPrompt, id]);
  useEffect(() => {
    if (submitValidateLoading) {
      setCurrentType("text");
    }
  }, [submitValidateLoading]);
  const content = {
    response: prompt?.description as string,
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };

  return (
    <>
      {isLoadingPrompt ? (
        <Loader
          type="Processing"
          variant="pageLoader"
          message={ConsoleMessages}
        />
      ) : (
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Box sx={{ px: 2, pt: 1, m: "auto" }}>
            <PageHeader
              title="Validate Request"
              buttons={[
                {
                  label: "TXT",
                  variant: "rounded-SQL",
                  sx: {
                    background:
                      CurrentType === "text" ? palette.color.gray[650] : "none",
                    fontWeight: CurrentType === "text" ? "bold" : 500,
                  },
                  onClick: () => handleOpenTxt(),
                },
                {
                  label: "SQL",
                  variant: "rounded-SQL",
                  sx: {
                    background:
                      CurrentType === "SQL" ? palette.color.gray[650] : "none",
                    fontWeight: CurrentType === "SQL" ? "bold" : 400,
                  },
                  onClick: () => handleOpenSQL_Editor(),
                },
                {
                  label: "Graph",
                  variant: "rounded-SQL",
                  sx: {
                    background:
                      CurrentType === "graph"
                        ? palette.color.gray[650]
                        : "none",
                    fontWeight: CurrentType === "graph" ? "bold" : 400,
                  },
                  onClick: () => handleOpenGraph(),
                },
              ]}
            />

            {submitValidateLoading ? (
              <Box
                sx={{
                  display: "flex",
                  width: isOpenSelectBar
                    ? { lg: "76%", md: "70%", xs: "60%" }
                    : "100%",
                  height: "calc(100vh - 156px)",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflowX: "hidden",
                  transition: "width 0.5s ease",
                  mt: 1,
                }}
              >
                <ResponseArea isLoading={submitValidateLoading} />

                <QueryComponent isLoading={submitValidateLoading} />
              </Box>
            ) : (
              <Box
                sx={{
                  height: "calc(100vh - 180px)",
                  width: "100%",
                  m: "auto",
                  pt: 2,
                }}
              >
                {CurrentType === "SQL" ? (
                  <Box
                    sx={{
                      margin: 0,
                      width: "100%",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      animation: "fallingEffect 0.8s ease forwards",
                      position: "relative",
                      zIndex: 10,
                      opacity: 1,
                      mb: 2,
                    }}
                  >
                    <SQL_Editor code={prompt?.sql ?? "Select * from test;"} />
                  </Box>
                ) : CurrentType === "graph" ? (
                  prompt && (
                    <Box
                      sx={{
                        margin: 0,
                        width: "100%",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        animation: "fallingEffect2 0.8s ease forwards",
                        position: "relative",
                        zIndex: 10,
                        opacity: 0,
                        mb: 3,
                      }}
                    >
                      <GraphModal2
                        prompt={prompt as Prompt}
                        validatePrompt={submitValidate}
                      />
                    </Box>
                  )
                ) : (
                  <PannelArea
                    content={content}
                    // handleUpdate={() => handleUpdate()}
                    isOpenSelectBar={isOpenSelectBar}
                    // handleOpenSelectBar={() => handleOpenSelectBar()}
                    handleCloseSelectBar={() => handleCloseSelectBar()}
                  />
                )}
                {CurrentPage === "validate" && (
                  <QueryComponent
                    content={content}
                    isLoading={isLoadingExecute}
                    handleUpdate={handleUpdate}
                  />
                )}
              </Box>
            )}
            {/* <table>
              <thead><tr>{prompt?.columns?.map((data)=><th style={{border:'1px solid red'}}>{data}</th>)}</tr></thead>
              <tbody>
                {prompt?.rows?.map((row)=>
                <tr>
                {prompt?.columns?.map((col)=><td style={{border:'1px solid green'}}>{row?.[col]}</td>)}
                </tr>
              )}
              </tbody>
            </table> */}
          </Box>
        </motion.div>
      )}
    </>
  );
};

export default ValidateRequestPage;
