"use client";
import { Box, Skeleton, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { FC, useEffect, useState } from "react";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
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
  isOpenSelectBar?: boolean;
  handleCloseSelectBar?: () => void;
  handleOpenSelectBar?: () => void;
}

const PannelArea: FC<PannelAreaProps> = ({
  content,
  handleUpdate,
  isOpenSelectBar,
  handleCloseSelectBar,
  handleOpenSelectBar,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isLoading = useAppSelector(getIsLoadingRequest);
  const dispatch = useAppDispatch();
  const {
    mutate: submitPrompt,
    isError: submitPromptError,
    isSuccess,
  } = useSubmitPrompt();

  const handleAvailable = () => {
    submitPrompt({ message: prompt });
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
            width: isOpenSelectBar
              ? { lg: "76%", md: "70%", xs: "60%" }
              : "100%",
            height: "100%",
            justifyContent: "space-between",
            overflowX: "hidden",
            transition: "width 0.5s ease",
          }}
        >
          {content ? (
            <>
              <ResponseArea
                content={content}
                handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
                isLoading={isLoading}
              />
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography className="animated-text animated-left-right-text">
                  Hello, Abdul{" "}
                </Typography>
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
