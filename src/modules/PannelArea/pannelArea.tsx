"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { FC, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import OptionsBar from "@/components/optionsBar/optionsBar";
import { useRouter } from "next/navigation";
import Tooltip from "@/components/Tooltip/tooltip";
import { CustomInput } from "./input";
import CustomLink from "@/components/Link/link";

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
            }}
          >
            <Paper
              type="dark-border"
              sx={{
                border: "1px solid rgb(52,51,65)",
                height: content ? "fit-content" : "100%",
                margin: 0,
                padding: content ? 1 : 0,
                // width: isOpenSelectBar
                //   ? { lg: "76%", md: "70%", xs: "60%" }
                //   : "100%",
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
                        {/* {content.response} */}
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
                            maxWidth: "100%", // You can adjust the width as needed
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
                          // onClick={handleOpenSelectBar}
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
            <Paper
              type="dark-border"
              sx={{
                // width: isOpenSelectBar
                //   ? { lg: "76%", md: "70%", xs: "60%" }
                //   : "100%",
                borderRadius: "8px",
                padding: "0.6rem",
                margin: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="text-sm" color={palette.gray[300]}>
                This query is estimated to take X minutes and will be
                approximatley X size.{" "}
                <span style={{ textDecoration: "underline" }}>
                  <CustomLink color="#90919b" variant="simple" href="#">
                    Need to optimize?
                  </CustomLink>
                </span>
              </Typography>
            </Paper>
          </Box>
          {isOpenSelectBar && (
            <OptionsBar
              close={handleCloseSelectBar}
              variant="input"
              handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
            />
          )}
        </Box>
        {content ? (
          ""
        ) : (
          <Paper type="light-border">
            <Box
              sx={{
                padding: "8px",
              }}
            >
              <Box
                sx={{
                  marginBottom: "0.5rem",
                }}
              >
                <Paper
                  type="dark-border"
                  sx={{
                    padding: "0.5rem ",
                    margin: 0,
                    minHeight: "5rem",
                    display: "flex",
                    maxHeight: "15rem",
                    borderRadius: "8px",
                  }}
                >
                  <span
                    style={{
                      display: "contents",
                      maxHeight: "10rem",
                      overflow: "auto",
                    }}
                  >
                    <CustomInput />
                  </span>
                </Paper>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    ml: "4px",
                  }}
                >
                  <Box width={163}>
                    <Button
                      size="small"
                      variant="outlined"
                      label="Prompt"
                      disabled={isLoading}
                      fullWidth
                      endIcon={
                        <Icon
                          icon="plus"
                          height={2}
                          width={8}
                          disabled={isLoading}
                        />
                      }
                    />
                  </Box>

                  <Box width={82}>
                    <Button
                      fullWidth
                      size="small"
                      disabled={isLoading}
                      variant="outlined"
                      label="Source"
                      endIcon={
                        <Icon
                          icon="minus"
                          height={2}
                          width={8}
                          disabled={isLoading}
                        />
                      }
                    />
                  </Box>
                </Box>

                <Box>
                  {isLoading ? (
                    ""
                  ) : (
                    <Box width={155} mr={"4px"}>
                      <Button
                        onClick={handleAvailable}
                        fullWidth
                        size="small"
                        variant="contained"
                        label="Validate"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default PannelArea;
