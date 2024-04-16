"use client";

import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Input, InputAdornment, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Input.css";
import Image from "next/image";

const TemplatePage = () => {
  const [isActive, setIsActive] = useState("public");

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <PageHeader type="Template" />
      <Box
        sx={{
          mt: "1rem",
          flexGrow: "1",
        }}
      >
        <Paper
          sx={{
            padding: "1rem",
            minHeight: "77vh",
          }}
          type="light-border"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                onClick={() => setIsActive("public")}
                sx={{
                  borderBottom:
                    isActive === "public"
                      ? "1px solid rgb(0,224,238)"
                      : "1px solid rgb(114,121,129)",

                  width: "202px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  pb: "5px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="text-md-regular">Public</Typography>
              </Box>

              <Box
                onClick={() => setIsActive("private")}
                sx={{
                  borderBottom:
                    isActive === "private"
                      ? "1px solid rgb(0,224,238)"
                      : "1px solid rgb(114,121,129)",
                  textAlign: "center",
                  width: "202px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  pb: "5px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="text-md-regular">Private</Typography>
              </Box>
            </Box>

            <Box>
              <div className="input-container">
                <Input
                  placeholder="Search ..."
                  disableUnderline
                  sx={{
                    backgroundColor: "rgb(115,130,133)",
                    zIndex: 2,
                    border: 0,
                    padding: "10px 16px 10px 16px",
                    height: 40,
                    borderRadius: "8px",
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon icon="search" />{" "}
                    </InputAdornment>
                  }
                />
              </div>
            </Box>
          </Box>

          <Box mt={"1.5rem"}>
            <Paper
              type="light-border"
              sx={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                border: 0,
              }}
            >
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Image
                  src={"/images/blank-square.svg"}
                  alt="pic"
                  width={64}
                  height={64}
                />
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography variant="text-md-regular">Template 1</Typography>
                  <Typography variant="text-xs-regular">
                    Maker by Rafat
                  </Typography>
                  <Typography variant="text-xs-regular">
                    Retrievers 3 bot will help to geth...
                  </Typography>
                </Box>
              </Box>
              <Icon icon="actions" width={42} height={24} />
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
