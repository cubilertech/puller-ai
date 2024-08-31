"use client";
import { Box, Skeleton } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useSubmitExecute } from "@/hooks/useExecute";
import GraphModal2 from "@/modals/graphModals/graphModal2";
import {
  useGetAllPrompt,
  useGetSinglePrompt,
  useSubmitPrompt,
} from "@/hooks/usePrompt";
import { palette } from "@/theme/Palette";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSubmitValidate } from "@/hooks/useValidate";
import {
  OptionsBarVariants,
  Prompt,
  UpdateVariables,
  Variable,
} from "@/utils/types";
import { ResponseArea } from "@/components/ResponseArea";
import { QueryComponent } from "@/components/QuaryComponent";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  UpdateIsLoadingPrompt,
  UpdatePromptValue,
} from "@/libs/redux/features/isLoadingRequest";
import { motion } from "framer-motion";
import { Loader } from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import CreateRequestPage from "../CreateRequestPage/CreateRequestPage";
import { Icon } from "@/components/Icon";
import {
  getLoadingText,
  getSubmitExecuteLoading,
  getSubmitPromptLoading,
  getSubmitValidateLoading,
  setLoadingText,
  setSubmitExecuteLoading,
  setSubmitPromptLoading,
  setSubmitValidateLoading,
} from "@/libs/redux/features/globalLoadings";
import { getVariables, setVariables } from "@/libs/redux/features/variables";
import { OptionsBar } from "@/components/optionsBar";
import SelectionTextEditor from "@/components/SelectionTextEditor";
import { isDemoMode, isPilotMode } from "@/utils/constants";

const SkeletonLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "flex-start",
        mt: 1,
        width: "100%",
      }}
    >
      <Box>
        <Box sx={{ transform: "scale(200%)", mt: 0.7 }}>
          <Icon icon="logoIcon" height={30} width={30} />
        </Box>
      </Box>

      <pre
        style={{
          width: "100%",
          paddingRight: 50,
          margin: "auto",
          textAlign: "start",
        }}
      >
        <Skeleton style={{ width: "100%", margin: "0", height: 32 }} />
        <Skeleton style={{ width: "100%", margin: "0", height: 32 }} />
        <Skeleton style={{ width: "80%", margin: "0", height: 32 }} />
      </pre>
    </Box>
  );
};
const RequestPage: FC = () => {
  const [CurrentType, setCurrentType] = useState<"text" | "graph" | "SQL">(
    "text"
  );
  const [textSelected, setTextSelected] = useState<string>("");
  const [selectionIndices, setSelectionIndices] = useState({
    start: 0,
    end: 0,
  });
  const [isEditingText, setIsEditingText] = useState(false);
  const [description, setDescription] = useState("");

  const [VariableId, setVariableId] = useState<string>("");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const variables = useAppSelector(getVariables);
  // const CurrentPage = useAppSelector(getCurrentPage);
  const consoleMessage = useAppSelector(getLoadingText);
  const submitPromptLoading = useAppSelector(getSubmitPromptLoading);
  const submitExecuteLoading = useAppSelector(getSubmitExecuteLoading);
  const submitValidateLoading = useAppSelector(getSubmitValidateLoading);
  const [isOpenSelectBar, setIsOpenSelectBar] = useState(false);
  const [SelectBarVarient, setSelectBarVarient] =
    useState<OptionsBarVariants | null>(null);
  const {
    mutate: submitExecute,
    isLoading: isLoadingExecute,
    isSuccess: isSuccessExecute,
  } = useSubmitExecute();
  const {
    data: validatedPrompt,
    mutate: submitValidate,
    // isLoading: submitValidateLoading,
    isSuccess: submitValidateSuccess,
  } = useSubmitValidate();
  const {
    data: submitPromptData,
    customMutate: submitPrompt,
    // isLoading: submitPromptLoading,
    isSuccess: submitPromptSuccess,
  } = useSubmitPrompt(() => {});
  const {
    data: singlePrompt,
    refetch: refetchPrompt,
    isLoading: singlePromptLoading,
  } = useGetSinglePrompt(id ?? "");
  const {
    data: allPrompt,
    refetch: refetchAllPrompt,
    isLoading: allPromptLoading,
    isSuccess: isSuccessAllPrompt,
  } = useGetAllPrompt();

  const handleSubmitPrompt = async () => {
    await submitPrompt({ message: query });
    dispatch(setSubmitPromptLoading(true));
    dispatch(setLoadingText("Processing"));
    dispatch(UpdatePromptValue(query));
    setQuery("");
  };
  const handleLatestPrompt = async (query: any) => {
    if (isDemoMode && query?.message) {
      await submitPrompt({ message: query?.message });
      dispatch(setSubmitPromptLoading(true));
      dispatch(setLoadingText("Processing"));
      dispatch(UpdatePromptValue(query?.message));
      setQuery("");
    } else if (query?.id) {
      await router.push(`request?id=${query?.id}`);
      dispatch(UpdateIsLoadingPrompt(true));
      // refetchPrompt();
    }
  };

  const handleUpdate = () => {
    if (id) {
      submitExecute({ prompt: `${isDemoMode ? "query#" : ""}${id}` });
      dispatch(setSubmitExecuteLoading(true));
    }
  };

  const prompt = useMemo(() => {
    if (submitValidateSuccess) {
      dispatch(setSubmitValidateLoading(false));
    }
    if (submitValidateSuccess && validatedPrompt) {
      if (isPilotMode) setDescription(validatedPrompt?.description as string);
      return validatedPrompt;
    } else {
      setDescription(singlePrompt?.description as string);
      return singlePrompt;
    }
  }, [singlePrompt, validatedPrompt, submitValidateSuccess]);
  const handleOpenGraph = () => {
    setCurrentType("graph");
  };
  // const UpdateVariables = () => {
  //   if (prompt?.id) {
  //     submitValidate({ prompt: prompt?.id, variables: variables });
  //     dispatch(setSubmitValidateLoading(true));
  //   }
  // };
  // console.log(SelectBarVarient, "SelectBarVarient");

  const handleUpdateVariable = (value?: UpdateVariables) => {
    if (value) {
      console.log("Updated value:", value);
      // Add your logic here to handle the updated value
      localStorage.setItem("variableId", value.id);
      setVariableId(value.id);
      setIsOpenSelectBar(true);
      if (value.type === "numeric" || value.type === "String") {
        setSelectBarVarient("input");
      } else if (value.type === "select_single") {
        setSelectBarVarient("round-checkbox");
      } else if (value.type === "select_multi") {
        setSelectBarVarient("square-checkbox");
      } else {
        setSelectBarVarient(null);
      }
    }
    dispatch(setVariables(prompt?.variables as Variable[]));
  };
  const handleOpenSQL_Editor = () => {
    setCurrentType("SQL");
  };
  const handleOpenTxt = () => {
    setCurrentType("text");
  };
  const handleCloseSelectBar = () => {
    setIsOpenSelectBar(false);
    setSelectBarVarient(null);
    localStorage.removeItem("variableId");
  };
  // const handleOpenSelectBar = () => {
  //   setIsOpenSelectBar(true);
  // };
  useEffect(() => {
    if (submitValidateLoading) {
      setCurrentType("text");
    }
  }, [submitValidateLoading]);
  useEffect(() => {
    if (isDemoMode) {
      setLoading(false);
    }
    refetchAllPrompt();
    localStorage.removeItem("variableId");
  }, []);
  useEffect(() => {
    if (isSuccessExecute && isDemoMode) {
      router.push(`/request/results/${id}`);
    }
    if (isSuccessAllPrompt && isPilotMode) {
      setLoading(false);
    }
  }, [isSuccessExecute, isSuccessAllPrompt]);
  const content = {
    response: prompt?.description as string,
    original:
      prompt?.message ||
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };
  useEffect(() => {
    if (
      !id &&
      !submitPromptLoading &&
      !submitExecuteLoading &&
      !submitValidateLoading &&
      !loading
    ) {
      localStorage.removeItem("variableId");
      setIsOpenSelectBar(false);
    }
  }, [
    id,
    submitPromptLoading,
    submitExecuteLoading,
    submitValidateLoading,
    loading,
  ]);

  // const handleMouseUp = () => {
  //   if (isDemoMode) {
  //     const selection = window.getSelection();
  //     console.log(selection);
  //     if (selection && selection.toString().length > 0) {
  //       const range = selection.getRangeAt(0);
  //       const start = range.startOffset;
  //       const end = range.endOffset;
  //       setTextSelected(selection.toString());
  //       setIsEditingText(true);
  //       setIsOpenSelectBar(false);
  //       localStorage.removeItem("variableId");
  //       // setSelectedText(selection.toString());
  //       // handleTextSelection(selection.toString());
  //       setSelectionIndices({ start, end });
  //     }
  //   }
  // };
  const handleMouseUp = () => {
    if (isDemoMode) {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        let ancestor: any = range.commonAncestorContainer;

        // Ensure we are working with an Element node
        if (ancestor.nodeType === Node.TEXT_NODE) {
          ancestor = ancestor.parentElement;
        }

        const parentDiv = ancestor.closest("div");

        if (parentDiv) {
          let start = 0;
          let end = 0;
          let foundStart = false;

          const traverseNodes = (node: any) => {
            if (node === range.startContainer) {
              start += range.startOffset;
              foundStart = true;
            } else if (node === range.endContainer) {
              end += range.endOffset;
              return true; // Stop traversal
            } else if (node.nodeType === Node.TEXT_NODE) {
              if (!foundStart) {
                start += node.textContent.length;
              }
              end += node.textContent.length;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              for (let child of node.childNodes) {
                if (traverseNodes(child)) {
                  return true; // Stop traversal
                }
              }
            }
            return false; // Continue traversal
          };

          traverseNodes(parentDiv);

          // Adjust end index to account for the selection length
          end = start + selection.toString().length;

          setTextSelected(selection.toString());
          setIsEditingText(true);
          setIsOpenSelectBar(false);
          localStorage.removeItem("variableId");
          setSelectionIndices({ start, end });
        }
      }
    }
  };

  // console.log(textSelected, "text", selectionIndices, "indices");

  const handleUpdateText = () => {
    if (textSelected.trim().length > 0) {
      let str = description;
      const updatedParagraph =
        str.slice(0, selectionIndices.start) +
        textSelected +
        str.slice(selectionIndices.end);
      setDescription(updatedParagraph);
      setIsEditingText(false);
    }
  };

  useEffect(() => {
    if (
      !isEditingText &&
      selectionIndices.start > 0 &&
      selectionIndices.end > 0
    ) {
      setSelectionIndices({ start: 0, end: 0 });
      setTextSelected("");
    }
  }, [isEditingText]);

  return (
    <>
      {loading &&
      !submitPromptLoading &&
      !submitExecuteLoading &&
      !submitValidateLoading &&
      !id ? (
        // for page refresh on request page
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      ) : loading &&
        !submitPromptLoading &&
        !submitExecuteLoading &&
        !submitValidateLoading &&
        id ? (
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      ) : !loading &&
        submitPromptLoading &&
        !submitExecuteLoading &&
        !submitValidateLoading ? (
        // for submit prompt loading
        <Loader
          type="Processing"
          variant="pageLoader"
          message={consoleMessage}
        />
      ) : // for submit ValidateLoading loading
      // : !loading && !submitPromptLoading && submitValidateLoading ? (
      //   // for validate prompt loading
      //   <Loader
      //     type="Processing"
      //     variant="pageLoader"
      //     message={"Updating Variables"}
      //   />
      // )
      id &&
        id.length &&
        !submitPromptLoading &&
        !singlePromptLoading &&
        !loading ? (
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Box sx={{ px: 2, pt: 1, m: "auto", overflow: "hidden" }}>
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
            <Box
              sx={{ display: "flex", gap: 0.5, width: "100%", height: "100%" }}
            >
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
                  }}
                >
                  <ResponseArea
                    isLoading={submitValidateLoading}
                    handleMouseUp={() => {}}
                  />

                  {CurrentType === "text" ? (
                    ""
                  ) : (
                    <QueryComponent isLoading={submitValidateLoading} />
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "calc(100vh - 150px)",
                    width:
                      isOpenSelectBar || isEditingText
                        ? { lg: "76%", md: "70%", xs: "60%" }
                        : "100%",
                    m: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.2s ease",
                    position: "relative",
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
                        pt: 1,
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
                          opacity: 1,
                          mb: 3,
                          pt: 1,
                        }}
                      >
                        <GraphModal2
                          prompt={prompt as Prompt}
                          validatePrompt={submitValidate}
                        />
                      </Box>
                    )
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <ResponseArea
                        prompt={
                          { ...prompt, description: description } as Prompt
                        }
                        handleUpdate={handleUpdateVariable}
                        isLoading={singlePromptLoading}
                        handleMouseUp={handleMouseUp}
                        isEditingText={isEditingText}
                        textSelected={textSelected}
                        indiceEnd={selectionIndices.end}
                        indiceStart={selectionIndices.start}
                        handleUpdateQuery={handleUpdate}
                      />
                    </Box>
                  )}
                  {CurrentType === "text" ? (
                    ""
                  ) : (
                    <QueryComponent
                      content={content}
                      isLoading={submitExecuteLoading}
                      handleUpdate={handleUpdate}
                    />
                  )}
                </Box>
              )}
              {isOpenSelectBar && (
                <Box
                  sx={{
                    height: "calc(100vh - 160px)",
                    mt: 1,
                    width: "23.8%",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <OptionsBar
                      PromptId={prompt?.id as string}
                      submitValidate={submitValidate}
                      variant={SelectBarVarient as OptionsBarVariants}
                      variableId={VariableId}
                      close={handleCloseSelectBar}
                    />
                  </motion.div>
                </Box>
              )}
              {isEditingText && (
                <Box
                  sx={{
                    height: "calc(100vh - 160px)",
                    mt: 1,
                    width: "calc(100vw - 79vw)",
                  }}
                >
                  <SelectionTextEditor
                    text={textSelected}
                    setText={setTextSelected}
                    close={() => setIsEditingText(false)}
                    handleSubmit={handleUpdateText}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>
      ) : !id &&
        !submitPromptLoading &&
        !submitExecuteLoading &&
        !submitValidateLoading &&
        !loading ? (
        <CreateRequestPage
          list={allPrompt}
          setRequestQuery={setQuery}
          requestQuery={query}
          handleLatestPrompt={handleLatestPrompt}
          handleSubmitPrompt={handleSubmitPrompt}
          submitPromptLoading={submitPromptLoading}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RequestPage;
