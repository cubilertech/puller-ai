"use client";
import { Box, Input } from "@mui/material";
import { Paper } from "../../components/Paper";
import React, { useCallback, useRef, useState, FC } from "react";
import { useRouter } from "next/navigation";

interface PanelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
}

const PanelArea: FC<PanelAreaProps> = ({ content, handleUpdate }) => {
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
          }}
        >
          <Paper
            type="dark-border"
            sx={{
              border: "1px solid rgb(52,51,65)",
              height: content ? "fit-content" : "100%",
              margin: 0,
              padding: content ? 1 : 0,
              width: "100%",
            }}
          ></Paper>
        </Box>
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
                }}
              >
                {/* <textarea
                  value={nodes.map((item) => JSON.stringify(item)).join("\n")}
                  onChange={updateGraphNodes}
                  placeholder="Enter array elements..."
                  rows={10}
                  cols={50}
                /> */}
              </Paper>
            </Box>
          </Box>
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
                }}
              >
                <Input
                  multiline
                  fullWidth
                  disableUnderline
                  placeholder="Graph edges"
                  sx={{
                    boxSizing: "border-box",
                    minHeight: "100%",
                    alignItems: "flex-start",
                    overflowY: "auto",
                  }}
                />
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default PanelArea;
