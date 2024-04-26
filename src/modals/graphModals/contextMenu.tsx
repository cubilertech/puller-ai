"use client";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Close } from "@mui/icons-material";
import { TextareaAutosize, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function ContextMenu(props: any) {
  const [value, setValue] = useState(props.variables);

  useEffect(() => {
    setValue(props.variables);
  }, [props.variables]);

  const updateNode = () => {
    props.handleNodeLabelChange(props.id, value);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Paper
          type="light-bg-border"
          sx={{
            width: "35rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Box
            zIndex={5}
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="text-sm">Update {props.label}</Typography>
            <Close onClick={() => props.onClose()} />
          </Box>

          <Box
            sx={{
              maxHeight: "20rem",
              width: "100%",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <TextareaAutosize
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                resize: "none",
                outline: "none",
              }}
              placeholder="Enter New Label"
              onChange={(event) => {
                try {
                  const parsedValue = JSON.parse(event.target.value);
                  setValue(parsedValue);
                } catch (error) {
                  console.error("Invalid JSON input:", error);
                }
              }}
              value={JSON.stringify(value, null, 2)}
            />
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            <Box width={100} height={38}>
              <Button
                variant="contained"
                label="Update"
                fullWidth
                sx={{
                  height: "38px !important",
                }}
                onClick={() => updateNode()}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
