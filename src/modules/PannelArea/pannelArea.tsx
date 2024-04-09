"use client";
import { Box, Input, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { FC, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import OptionsBar from "@/components/optionsBar/optionsBar";

interface PannelAreaProps {
  content?: {
    response: string;
    original: string;
  };
}

const PannelArea: FC<PannelAreaProps> = ({ content }) => {
  const [isLoading, setisLoading] = useState(false);
  const [isOpenSelectBar, setisOpenSelectBar] = useState(false);

  const handleAvailable = () => {
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false);
    }, 8000);
  };
  const handleOpenSelectBar = () => {
    setisOpenSelectBar(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          mt: 2,
          height: "78vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            height: "80%",
          }}
        >
          <Paper
            type="dark-border"
            sx={{
              // flexGrow: "1",
              height: content ? "fit-content" : "100%",
              margin: 0,
              marginBottom: "1rem",
              padding: content ? 1 : 0,
              width: isOpenSelectBar ? "76%" : "100%",
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
                <Loader varient="simple" />
              </Box>
            ) : content ? (
              <>
                <Typography
                  variant="display-xs"
                  sx={{
                    width: "98%",
                    pr: 5,
                    pt: 1,
                    m: "auto",
                    textAlign: "start",
                  }}
                  component="p"
                >
                  {content.response}
                </Typography>
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
                      color={palette.gray[400]}
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
                      onClick={handleOpenSelectBar}
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
          {isOpenSelectBar && <OptionsBar variant="dropdown" />}
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
                  sx={{ padding: "0.5rem 1rem 2rem", margin: 0 }}
                >
                  <Input
                    multiline
                    fullWidth
                    disableUnderline
                    disabled={isLoading}
                    placeholder="Type your data request (prompt) here..."
                  />
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
                  }}
                >
                  <Box width={163}>
                    <Button
                      size="small"
                      variant="outlined"
                      label="Prompt"
                      disabled={isLoading}
                      fullWidth
                      endIcon={<Icon icon="plus" height={2} width={8} />}
                    />
                  </Box>

                  <Box width={82}>
                    <Button
                      fullWidth
                      size="small"
                      disabled={isLoading}
                      variant="outlined"
                      label="Source"
                      endIcon={<Icon icon="minus" height={2} width={8} />}
                    />
                  </Box>
                </Box>

                <Box>
                  {isLoading ? (
                    ""
                  ) : (
                    <Box width={155}>
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
