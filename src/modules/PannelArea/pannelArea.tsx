"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { FC, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { usePathname } from "next/navigation";
import { OptionsBar } from "@/components/optionsBar";
import "./panelArea.css";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSubmitPrompt } from "@/hooks/usePrompt";
import { CURRENT_MODE, MODES, dummySQL } from "@/utils/constants";
import { AlertModal } from "@/modals/AlertModal";
import { ResponseArea } from "@/components/ResponseArea";
import { LatestPullesCard } from "@/components/Latestpulles-Card";
import { LatestPullsData } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  UpdateCurrentPage,
  UpdateIsLoadingRequest,
  getIsLoadingRequest,
} from "@/libs/redux/features/isLoadingRequest";

interface PannelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
  sql?: string;
  isSQLEditorOpen?: boolean;
  isOpenSelectBar?: boolean;
  handleCloseSQL_Editor?: () => void;
  handleCloseSelectBar?: () => void;
  handleOpenSelectBar?: () => void;
}

const PannelArea: FC<PannelAreaProps> = ({
  content,
  handleUpdate,
  sql,
  isSQLEditorOpen,
  isOpenSelectBar,
  handleCloseSQL_Editor,
  handleCloseSelectBar,
  handleOpenSelectBar,
}) => {
  // const [isLoading, setisLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isLoading = useAppSelector(getIsLoadingRequest)
  const dispatch = useAppDispatch();
  const {
    mutate: submitPrompt,
    // data: PromptData,
    isError: submitPromptError,
    isSuccess,
  } = useSubmitPrompt();

  const handleAvailable = () => {
    submitPrompt({ message: prompt });
    // setisLoading(true);
    dispatch(UpdateIsLoadingRequest(true));
    dispatch(UpdateCurrentPage("validate"));
  };
  const handleTextareaChange = (event: any) => {
    setPrompt(event.target.value);
  };
  const handlePrompt = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    }
  };
  const handleSource = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    }
  };
  const handleLatestPulls = (text: string) => {
    setPrompt(text);
  };
  useEffect(() => {
    if (submitPromptError) {
      dispatch(UpdateIsLoadingRequest(false));
      dispatch(UpdateIsLoadingRequest("create"));
    }
  }, [submitPromptError, isSuccess]);
  console.log(isLoading, "isLoading");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "calc(100vh - 180px)",
        width: "100%",
        gap: 2,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          height: "calc(100vh - 180px)",
          width: "100%",
          alignItems: "flex-end",
          flexGrow: "1",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          sx={{
            width:
              isOpenSelectBar || isSQLEditorOpen
                ? { lg: "76%", md: "70%", xs: "60%" }
                : "100%",
            height: "100%",
            justifyContent: content ? "flex-end" : "space-between",
            overflowX: "hidden",
            transition: "width 0.5s ease",
          }}
        >
          {content ? (
            <Paper
              variant="dark-border"
              sx={{
                border: `1px solid ${palette.color.gray[700]}`,
                height: content ? "fit-content" : "100%",
                margin: 0,
                padding: content ? 1 : 0,
                width: "100%",
              }}
            >
              <ResponseArea
                content={content}
                handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
                variables={content ? true : false}
                isLoading={isLoading}
              />
            </Paper>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography className="animated-text">Hello, Abdul </Typography>
                <Typography
                  sx={{
                    color: palette.color.gray[600],
                    fontSize: "50px",
                    fontWeight: 500,
                  }}
                >
                  How can I help you today?
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 2,
                }}
              >
                {LatestPullsData.map((item, i) => (
                  <LatestPullesCard
                    data={item}
                    onClick={() => handleLatestPulls(item.text)}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {isOpenSelectBar && (
          <Box
            className={isOpenSelectBar ? "slide-in" : "slide-out"}
            sx={{
              width: { lg: "26%", md: "38%", sm: "40%" },
            }}
          >
            <OptionsBar
              close={handleCloseSelectBar}
              variant="square-checkbox"
              handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
            />
          </Box>
        )}
        {isSQLEditorOpen && (
          <Box
            className={isSQLEditorOpen ? "slide-in" : "slide-out"}
            sx={{
              width: { lg: "32%", md: "38%", sm: "40%" },
              height: "100%",
            }}
          >
            <SQL_Editor
              handleClose={
                handleCloseSQL_Editor
                  ? () => handleCloseSQL_Editor()
                  : undefined
              }
              code={sql ? sql : dummySQL}
            />
          </Box>
        )}
      </Box>
      {content ? (
        ""
      ) : (
        <CreateInputAreaComponent
          handlePrompt={handlePrompt}
          handleSource={handleSource}
          handleValidate={handleAvailable}
          onChangeInput={handleTextareaChange}
          isLoading={isLoading}
          value={prompt}
        />
      )}
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default PannelArea;
