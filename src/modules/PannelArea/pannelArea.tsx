"use client";
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { OptionsBar } from "@/components/optionsBar";
import "./panelArea.css";
import { useSubmitPrompt } from "@/hooks/usePrompt";
import { isPilotMode } from "@/utils/constants";
import { AlertModal } from "@/modals/AlertModal";
import { ResponseArea } from "@/components/ResponseArea";
import { LatestPullesCard } from "@/components/Latestpulles-Card";
import { LatestPullsData } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  UpdateConsoleMessages,
  UpdateCurrentPage,
  UpdateIsLoadingPrompt,
  UpdateIsLoadingRequest,
  UpdatePromptValue,
  getCurrentPage,
  getIsLoadingRequest,
} from "@/libs/redux/features/isLoadingRequest";
import { Loader } from "@/components/Loader";
import { motion } from "framer-motion";

interface PannelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  // handleUpdate?: () => void;
  isOpenSelectBar?: boolean;
  handleCloseSelectBar?: () => void;
  // handleOpenSelectBar?: () => void;
}

const PannelArea: FC<PannelAreaProps> = ({
  content,
  // handleUpdate,
  isOpenSelectBar,
  handleCloseSelectBar,
  // handleOpenSelectBar,
}) => {
  const [prompt, setPrompt] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isLoading = useAppSelector(getIsLoadingRequest);
  const CurrentPage = useAppSelector(getCurrentPage);
  // const [consoleMessage, setConsoleMessage] = useState<string>("");
  const dispatch = useAppDispatch();
  const {
    customMutate: submitPrompt,
    isError: submitPromptError,
    isSuccess,
  } = useSubmitPrompt((message) => {
    dispatch(UpdateConsoleMessages(message));
    // setConsoleMessage(message);
  });

  const handleAvailable = async () => {
    await submitPrompt({ message: prompt });
    // await dispatch(UpdateIsLoadingRequest(true));
    dispatch(UpdateIsLoadingPrompt(true));
    if (prompt) {
      await dispatch(UpdatePromptValue(prompt));
    }
    // dispatch(UpdateCurrentPage("validate"));
  };
  const handleTextareaChange = (event: any) => {
    setPrompt(event.target.value);
  };
  const handlePrompt = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const handleSource = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const handleLatestPulls = async (text: string) => {
    // setPrompt(text);
    await submitPrompt({ message: text });
    await dispatch(UpdateIsLoadingPrompt(true));
    // await dispatch(UpdateIsLoadingRequest(true));
    await dispatch(UpdatePromptValue(text));
  };
  useEffect(() => {
    if (submitPromptError) {
      dispatch(UpdateIsLoadingRequest(false));
      dispatch(UpdateCurrentPage("create"));
    }
  }, [submitPromptError]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height:
            CurrentPage === "validate"
              ? "calc(100vh - 275px)"
              : "calc(100vh - 168px)",
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
              <div>
                <ResponseArea
                  content={content}
                  // handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
                  isLoading={isLoading}
                />
              </div>
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
                    Create a pull request to get started
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    width: "100%",
                    gap: 2,
                    overflow: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {LatestPullsData.map((item, i) => (
                    // <motion.div
                    //   key={`motion-div-${i}`}
                    //   animate={{ y: [-240, 0] }}
                    //   transition={{
                    //     duration: i === 0 ? 1 : i,
                    //     ease: "easeInOut",
                    //   }}
                    // >
                      <LatestPullesCard
                        key={i}
                        query={item.query}
                        onClick={() => handleLatestPulls(item.query)}
                      />
                    // </motion.div>
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
                // handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
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
    </>
  );
};

export default PannelArea;
