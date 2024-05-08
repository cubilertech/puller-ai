"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { FC, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { usePathname } from "next/navigation";
import CustomLink from "@/components/Link/link";
import { Tooltip } from "@/components/Tooltip";
import { OptionsBar } from "@/components/optionsBar";
import "./panelArea.css";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSelector } from "react-redux";
import { useSubmitPrompt } from "@/hooks/usePrompt";
import { dummySQL } from "@/utils/constants";
import { getValidateData } from "@/libs/redux/features/validateRequest";

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
  const variable = useSelector(getValidateData);

  const [isLoading, setisLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { mutate: submitPrompt, isError: submitPromptError } =
    useSubmitPrompt();
  const routename = usePathname();
  const routeParts = routename.replace(/^\//, "").split("/");
  const isValidate = routeParts.includes("validate");

  const handleAvailable = () => {
    submitPrompt({ message: prompt });
    setisLoading(true);
  };
  const handleTextareaChange = (event: any) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    if (submitPromptError) {
      setisLoading(false);
    }
  }, [submitPromptError]);
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
            justifyContent: "flex-end",
            overflowX: "hidden",
            transition: "width 0.5s ease",
          }}
        >
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
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Loader type="Processing" variant="simple" />
              </Box>
            ) : content ? (
              <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                <Box>
                  <Box display={"flex"}>
                    <Typography
                      variant={"display-xs"}
                      sx={{
                        width: "98%",
                        pr: 5,
                        pt: 1,
                        m: "auto",
                        textAlign: "start",
                        color: isOpenSelectBar
                          ? palette.opacity.lightGray
                          : palette.base.white,
                      }}
                      component="p"
                    >
                      The data request will give you transaction level data
                      (from the
                      <Tooltip
                        variant="info"
                        title="Seasonal Transactions"
                        description="“TXN_SZNAL” table . This query uses a table called Transactions that contains the following columns:"
                      >
                        <Typography
                          variant={"display-xs"}
                          onClick={handleOpenSelectBar}
                          sx={{
                            borderRadius: "8px",
                            bgcolor: isOpenSelectBar ? palette.base.white : "",
                            color: isOpenSelectBar
                              ? palette.color.midnightPlum
                              : "",
                            mx: "5px",
                            pb: "3px",
                            pr: "4px",
                            ":hover": {
                              backgroundColor: palette.color.gray[600],
                            },
                          }}
                        >
                          {variable}
                        </Typography>
                      </Tooltip>
                      ) for the past 52 weeks, ending March 15, 2024, grouped by
                      week and by Store ID. It only covers product SKUs that
                      include Flyease technology, which is determined from INT
                      DB for Product ID values 1234 and 5678
                    </Typography>
                  </Box>

                  <Box pt={2} pb={1}>
                    <Divider type="dark" variant="fullWidth" />
                  </Box>
                  <Box
                    sx={{
                      width: "98%",
                      m: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        width: "80%",
                      }}
                    >
                      <Typography variant="text-xs-bold">Original</Typography>
                      <Typography
                        variant="text-xs-regular"
                        color={palette.color.gray[300]}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {content.original}
                      </Typography>
                    </Box>
                    <Box sx={{ width: "122px" }}>
                      <Button
                        sx={{
                          width: "122px",
                          height: "38px !important",
                        }}
                        onClick={handleUpdate}
                        label="Run Query"
                        variant="contained"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Paper>
          {isValidate && (
            <Paper
              variant="dark-border"
              sx={{
                borderRadius: "16px",
                height: "56px",
                padding: "0.6rem",
                margin: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                animation: "fallingEffect 0.5s ease forwards",
                position: "relative",
                top: "-500px",
                zIndex: 10,
                opacity: 0,
              }}
            >
              <Typography variant="text-sm" color={palette.color.gray[300]}>
                This query is estimated to take X minutes and will be
                approximately X size.
                <span style={{ textDecoration: "underline" }}>
                  <CustomLink color="#90919b" variant="simple" href="#">
                    Need to optimize?
                  </CustomLink>
                </span>
              </Typography>
            </Paper>
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
          handleValidate={handleAvailable}
          onChangeInput={handleTextareaChange}
          isLoading={isLoading}
          value={prompt}
        />
      )}
    </Box>
  );
};

export default PannelArea;
