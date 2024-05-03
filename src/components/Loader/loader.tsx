"use client";
import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import "./loader.css";
import { LoaderVariants } from "@/utils/types";

interface LoaderProps {
  variant: LoaderVariants;
  type: "Loading" | "Processing";
}

const Loader: FC<LoaderProps> = ({ variant, type }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  switch (variant) {
    case "simple":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className={`loader-container ${showLoader ? "fade-in" : "fade-out"}`}
        >
          <Icon icon="logoIcon" width={240} height={260} />

          <Typography
            variant="display-xs-medium"
            className={
              type === "Loading" ? "typing2-animation" : "typing-animation"
            }
          ></Typography>
        </Box>
      );
    case "paper":
      return (
        <Paper variant="light-border" sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Icon icon="logoIcon" width={260} height={280} />
            <Typography
              variant="display-xs-medium"
              className={
                type === "Loading" ? "typing2-animation" : "typing-animation"
              }
            ></Typography>
          </Box>
        </Paper>
      );
    case "pageLoader":
      return (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            height: "100%",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
          className={`loader-container ${showLoader ? "fade-in" : "fade-out"}`}
        >
          <Paper
            variant="light-border"
            sx={{
              height: { xl: "516px", lg: "350px", md: "216px" },
              margin: 0,
              padding: 0,
              width: { xl: "704px", lg: "504px", md: "403px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Icon icon="logoIcon" width={240} height={260} />

                <Typography
                  variant="display-xs-medium"
                  className={
                    type === "Loading"
                      ? "typing2-animation"
                      : "typing-animation"
                  }
                ></Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      );
  }
};

export default Loader;
