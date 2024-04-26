"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { FC, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import { useRouter } from "next/navigation";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { OptionsBar } from "@/components/optionsBar";
import { Tooltip } from "@/components/Tooltip";

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
          <Paper
            type="dark-border"
            sx={{
              border: "1px solid rgb(52,51,65)",
              height: content ? "fit-content" : "100%",
              margin: 0,
              padding: content ? 1 : 0,
              width: isOpenSelectBar
                ? { lg: "76%", md: "70%", xs: "60%" }
                : "100%",
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
              <>
                <Box display={"flex"}>
                  <Typography
                    variant="display-xs"
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
                    The data request will give you transaction level data (from
                    the
                    <Tooltip
                      variant="info"
                      title="Seasonal Transactions"
                      description="“TXN_SZNAL” table . This query uses a table called Transactions that contains the following columns:"
                    >
                      <Typography
                        variant="display-xs"
                        onClick={handleOpenSelectBar}
                        sx={{
                          borderRadius: "8px",
                          bgcolor: isOpenSelectBar ? "rgb(255,255,255)" : "",
                          color: isOpenSelectBar ? " rgba(42, 39, 62, 1)" : "",
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
                    ) for the past 52 weeks, ending March 15, 2024, grouped by
                    week and by Store ID. It only covers product SKUs that
                    include Flyease technology, which is determined from INT DB
                    for Product ID values 1234 and 5678
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
              </>
            ) : (
              ""
            )}
          </Paper>
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
          <CreateInputAreaComponent handleValidate={handleAvailable} />
        )}
      </Box>
    </>
  );
};

export default PannelArea;
