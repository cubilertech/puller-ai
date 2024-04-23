"use client";
import React, { FC, useState } from "react";
import { Loader } from "@/components/Loader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import "./LoaderComponent.css"; // Import CSS file for animations

interface LoaderComponentProps {
  type: "Loading" | "Processing";
}

const LoaderComponent: FC<LoaderComponentProps> = ({ type }) => {
  const [showLoader, setShowLoader] = useState(true);

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
      className={`loader-container ${showLoader ? "fade-in" : ""}`}
    >
      <Paper
        type="light-border"
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
          <Loader
            type={type === "Loading" ? "Loading" : "Processing"}
            varient="simple"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoaderComponent;
