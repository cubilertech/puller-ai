"use client";
import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "@/components/PageHeader";
import { Loader } from "@/components/Loader";
import { useSubmitExecute } from "@/hooks/useExecute";
// import GraphModal from "@/modals/graphModals/graphModal";
import GraphModal2 from "@/modals/graphModals/graphModal2";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
interface Props {
  id: string;
}
const ValidateRequestPage: FC<Props> = ({ id }) => {
  const [isProccessing, setisProccessing] = useState(false);
  const [isSQLEditorOpen, setIsSQLEditorOpen] = useState(false);
  const [isOpenSelectBar, setIsOpenSelectBar] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  const { mutate: submitExecute, isError: submitExecuteError } =
    useSubmitExecute();
  const {
    data: prompt,
    isLoading,
    refetch: refetchPrompt,
  } = useGetSinglePrompt(id);

  const handleUpdate = () => {
    submitExecute({ prompt: `query#${id}` });
    setisProccessing(true);
  };
  const handleOpenGraph = () => {
    setOpenGraph(!openGraph);
  };

  const handleCloseSQL_Editor = () => {
    setIsSQLEditorOpen(false);
  };
  const handleOpenSQL_Editor = () => {
    setIsSQLEditorOpen(true);
    if (isOpenSelectBar) {
      setIsOpenSelectBar(false);
    }
  };
  const handleCloseSelectBar = () => {
    setIsOpenSelectBar(false);
  };
  const handleOpenSelectBar = () => {
    setIsOpenSelectBar(true);
    if (isSQLEditorOpen) {
      setIsSQLEditorOpen(false);
    }
  };
  useEffect(() => {
    refetchPrompt();
  }, [refetchPrompt]);

  useEffect(() => {
    if (submitExecuteError) {
      setisProccessing(false);
    }
  }, [submitExecuteError]);

  // const content = {
  //   response:
  //     "The data request will give you transaction level data (from the TXN_SZNAL table) for the past 52 weeks, ending March 15, 2024,  grouped by week and by Store ID. It only covers product SKUs that include Flyease technology, which is determined from INT DB for Product ID values 1234 and 5678.",
  //   original:
  //     "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  // };
  const content = {
    response: prompt?.description as string,
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };

  return (
    <>
      {isLoading || isProccessing ? (
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
        <Box sx={{ px: 1.2, pt: 1 }}>
          {!isSQLEditorOpen && (
            <PageHeader
              title="Validate Request"
              buttons={[
                {
                  label: "Graph",
                  variant: "rounded-SQL",
                  onClick: () => handleOpenGraph(),
                },
                {
                  label: "SQL",
                  variant: "rounded-SQL",
                  onClick: () => handleOpenSQL_Editor(),
                },
              ]}
            />
          )}

          <GraphModal2
            open={openGraph}
            handleClose={() => handleOpenGraph()}
            graph={prompt?.graph ?? []}
          />
          {/* <GraphModal open={openGraph} handleClose={() => handleOpenGraph()} /> */}
          <Box sx={{ width: "97%", m: "auto", pt: 2 }}>
            <PannelArea
              sql={prompt?.sql ?? "Select * from test;"}
              content={content}
              handleUpdate={() => handleUpdate()}
              isSQLEditorOpen={isSQLEditorOpen}
              handleCloseSQL_Editor={() => handleCloseSQL_Editor()}
              isOpenSelectBar={isOpenSelectBar}
              handleOpenSelectBar={() => handleOpenSelectBar()}
              handleCloseSelectBar={() => handleCloseSelectBar()}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ValidateRequestPage;
