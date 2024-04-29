"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { FC, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { usePathname, useRouter } from "next/navigation";
import CustomLink from "@/components/Link/link";
import { Tooltip } from "@/components/Tooltip";
import { OptionsBar } from "@/components/optionsBar";
import "./panelArea.css";

interface PannelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
}

const PannelArea: FC<PannelAreaProps> = ({ content, handleUpdate }) => {
  const route = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [isOpenSelectBar, setisOpenSelectBar] = useState(false);

  const routename = usePathname();
  const routeParts = routename.replace(/^\//, "").split("/");
  const isValidate = routeParts.includes("validate");

  const handleAvailable = () => {
    setisLoading(true);
    setTimeout(() => {
      route.push("/request/validate");
    }, 2000);
  };

  const handleOpenSelectBar = () => {
    setisOpenSelectBar(true);
  };
  const handleCloseSelectBar = () => {
    setisOpenSelectBar(false);
  };
  const [isTextareaFilled, setIsTextareaFilled] = useState(false);

  const handleTextareaChange = (event: any) => {
    setIsTextareaFilled(event.target.value.trim().length > 0);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "calc(100vh - 200px)",
          // height: "100%",
          width: "100%",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            flexGrow: "1",
            justifyContent: "space-between",
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
              justifyContent: "flex-end",
            }}
          >
            <Paper
              type="dark-border"
              sx={{
                border: "1px solid rgb(52,51,65)",
                height: content ? "fit-content" : "100%",
                // height: "100%",
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
                  <Loader type="Processing" varient="simple" />
                </Box>
              ) : content ? (
                <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                  <Box>
                    <Box display={"flex"}>
                      <Typography
                        variant={{
                          xl: "display-xs",
                          lg: "text-md-regular",
                          md: "text-sm",
                          sm: "text-xxs-regular",
                        }}
                        sx={{
                          width: "98%",
                          pr: 5,
                          pt: 1,
                          m: "auto",
                          textAlign: "start",
                          color: isOpenSelectBar
                            ? "rgba(151, 151, 161, 1)"
                            : "rgba(255, 255, 255, 1)",
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
                            variant={{
                              xl: "display-xs",
                              lg: "text-md-regular",
                              md: "text-sm",
                              sm: "text-xxs-regular",
                            }}
                            onClick={handleOpenSelectBar}
                            sx={{
                              borderRadius: "8px",
                              bgcolor: isOpenSelectBar
                                ? "rgb(255,255,255)"
                                : "",
                              color: isOpenSelectBar
                                ? " rgba(42, 39, 62, 1)"
                                : "",
                              mx: "5px",
                              pb: "3px",
                              pr: "4px",
                              ":hover": {
                                bgcolor: "rgb(91,93,107)",
                              },
                            }}
                          >
                            {" "}
                            TXN_SZNAL table
                          </Typography>
                        </Tooltip>
                        ) for the past 52 weeks, ending March 15, 2024, grouped
                        by week and by Store ID. It only covers product SKUs
                        that include Flyease technology, which is determined
                        from INT DB for Product ID values 1234 and 5678
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
                          color={palette.gray[300]}
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
              // <Paper
              //   type="dark-border"
              //   sx={{
              //     // width: isOpenSelectBar
              //     //   ? { lg: "76%", md: "70%", xs: "60%" }
              //     //   : "100%",
              //     borderRadius: "8px",
              //     padding: "0.6rem",
              //     margin: 0,
              //     display: "flex",
              //     justifyContent: "center",
              //     alignItems: "center",
              //   }}
              // >
              //   <Typography variant="text-sm" color={palette.gray[300]}>
              //     This query is estimated to take X minutes and will be
              //     approximatley X size.{" "}
              //     <span style={{ textDecoration: "underline" }}>
              //       <CustomLink color="#90919b" variant="simple" href="#">
              //         Need to optimize?
              //       </CustomLink>
              //     </span>
              //   </Typography>
              // </Paper>
              <Paper
                type="dark-border"
                sx={{
                  borderRadius: "8px",
                  padding: "0.6rem",
                  margin: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // Add CSS animation for falling effect
                  animation: "fallingEffect 0.5s ease forwards",
                  // Adjust these properties according to your layout
                  position: "relative",
                  top: "-500px", // Initially position above the viewport
                  zIndex: 10,
                  opacity: 0, // Initially invisible
                }}
              >
                <Typography variant="text-sm" color={palette.gray[300]}>
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
            <OptionsBar
              close={handleCloseSelectBar}
              variant="square-checkbox"
              handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
            />
          )}
        </Box>
        {content ? (
          ""
        ) : (
          <CreateInputAreaComponent
            handleValidate={handleAvailable}
            onChangeInput={handleTextareaChange}
            isLoading={isLoading}
            isTextareaFilled={isTextareaFilled}
          />
        )}
      </Box>
    </>
  );
};

export default PannelArea;
