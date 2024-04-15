import { Box, Modal, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { format } from "sql-formatter";
import "./style.css";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "transparnet",
  border: "2px solid #000",
  boxShadow: 24,
};

interface SQL_EditorModalProps {
  open: boolean;
  handleClose: () => void;
  code: string;
}

const SQL_EditorModal: FC<SQL_EditorModalProps> = ({
  handleClose,
  open,
  code,
}) => {
  // State to store the formatted code
  const [formattedCode, setFormattedCode] = useState<string>("");

  // Function to format the code using Prettier
  useEffect(() => {
    setFormattedCode(format(code, { language: "mysql" }));
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Paper type="dark-border" sx={{ padding: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              pb: 2,
            }}
          >
            <Typography variant="h4">SQL Editor</Typography>
            <Button
              variant="text"
              onClick={handleClose}
              sx={{
                color: "white",
                bgcolor: "#293b42",
                borderRadius: "100%",
                border: "none",
                ":hover": { borderRadius: "100%", border: "none" },
              }}
            >
              <Close />
            </Button>
          </Box>
          <MonacoEditor
            width="800"
            height="600"
            language="javascript"
            theme="custom-monaco-theme"
            value={formattedCode}
            options={{
              readOnly: true,
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
            }}
          />
        </Paper>
      </Box>
    </Modal>
  );
};

export default SQL_EditorModal;
