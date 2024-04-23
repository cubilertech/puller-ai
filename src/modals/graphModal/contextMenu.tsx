import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import Input from "@/components/Input/input";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};
export default function ContextMenu(props: any) {
  const id = "simple-popper";
  const [value, setValue] = useState(props.label);
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
          type="light-border"
          sx={{
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
            <Typography variant="text-sm">Update Node</Typography>
            <Close onClick={() => props.onClose()} />
          </Box>
          <Input
            placeholder="Enter New Label"
            onChange={(eve) => setValue(eve.target.value)}
            value={value}
          />
          <Box width={180}>
            <Button
              variant="contained"
              label="Update Node"
              fullWidth
              onClick={() => updateNode()}
            />
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}
