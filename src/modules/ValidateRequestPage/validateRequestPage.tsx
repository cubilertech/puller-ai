"use client";
import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "@/components/PageHeader";
import { useSubmitExecute } from "@/hooks/useExecute";
import GraphModal2 from "@/modals/graphModals/graphModal2";
import { useGetSinglePrompt } from "@/hooks/usePrompt";
import { palette } from "@/theme/Palette";
import { SQL_Editor } from "@/components/sql_Editor";
interface Props {
  id: string;
}
const ValidateRequestPage: FC<Props> = ({ id }) => {
  const [CurrentType, setCurrentType] = useState<"text" | "graph" | "SQL">(
    "text"
  );
  // const [isSQLEditorOpen, setIsSQLEditorOpen] = useState(false);
  const [isOpenSelectBar, setIsOpenSelectBar] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  const { mutate: submitExecute, isError: submitExecuteError } =
    useSubmitExecute();
  const { data: prompt, refetch: refetchPrompt } = useGetSinglePrompt(id);

  const handleUpdate = () => {
    if (id) {
      submitExecute({ prompt: `query#${id}` });
    }
  };
  const handleOpenGraph = () => {
    setOpenGraph(!openGraph);
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
  const handleOpenSelectBar = () => {
    setIsOpenSelectBar(true);
  };
  useEffect(() => {
    if (id) {
      refetchPrompt();
    }
  }, [refetchPrompt, id]);

  const content = {
    response: prompt?.description as string,
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };

  return (
    <>
      <Box sx={{ maxWidth: "1100px", pt: 1, m: "auto" }}>
        <PageHeader
          title="Validate Request"
          buttons={[
            {
              label: "Txt",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "text"
                    ? palette.linearGradient.purpleBlue
                    : "",
              },
              onClick: () => handleOpenTxt(),
            },
            {
              label: "Graph",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "graph"
                    ? palette.linearGradient.purpleBlue
                    : "",
              },
              onClick: () => handleOpenGraph(),
            },
            {
              label: "SQL",
              variant: "rounded-SQL",
              sx: {
                background:
                  CurrentType === "SQL"
                    ? palette.linearGradient.purpleBlue
                    : "",
              },
              onClick: () => handleOpenSQL_Editor(),
            },
          ]}
        />

        <GraphModal2
          open={openGraph}
          handleClose={() => handleOpenGraph()}
          graph={prompt?.graph ?? []}
        />

        {/* <GraphModal open={openGraph} handleClose={() => handleOpenGraph()} /> */}
        <Box sx={{ width: "100%", m: "auto", pt: 2 }}>
          {CurrentType === "SQL" ? (
            <Box
              sx={{
                height: "100%",
                margin: 0,
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation: "LeftToCenterEffect 0.5s ease forwards",
                position: "relative",
                // top: "-500px",
                zIndex: 10,
                opacity: 0,
              }}
            >
              <SQL_Editor code={prompt?.sql ?? "Select * from test;"} />
            </Box>
          ) : (
            <PannelArea
              sql={prompt?.sql ?? "Select * from test;"}
              content={content}
              handleUpdate={() => handleUpdate()}
              isOpenSelectBar={isOpenSelectBar}
              handleOpenSelectBar={() => handleOpenSelectBar()}
              handleCloseSelectBar={() => handleCloseSelectBar()}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default ValidateRequestPage;
