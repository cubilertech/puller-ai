import { Box, Modal, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import "./style.css";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Close } from "@mui/icons-material";
import Divider from "@/components/Divider/divider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "53%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "70vh",
  bgcolor: "transparnet",
  border: "none",
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
  const [formattedCode, setFormattedCode] = useState<string>("");

  useEffect(() => {
    if(code)
    setFormattedCode(format(code, { language: "mysql" }));
  }, [code]);
  const customCoyStyle = {
    ...coy,
    'code[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      height: "100%",
      overflow: "auto",
    },
    'pre[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      height: "100%",
      overflow: "auto",
    },
    'span[class="token"]': {
      ...coy['span[class="token"]'],
      background: "transparent",
      fontSize: "16px !important",
    },
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Paper
          variant="dark-border"
          sx={{
            padding: 3,
            height: "69vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
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
          <Divider variant="fullWidth" type="light" />
          <Box
            sx={{
              width: "100%",
              mt: 1,
              maxHeight: "86%",
              overflow: "auto",
              scrollbarWidth: "none",
            }}
          >
            {/* Display formatted code with line numbers in a Typography component */}
            <Typography
              component="div"
              sx={{ whiteSpace: "pre-wrap", lineHeight: "30px" }}
            >
              <SyntaxHighlighter
                language="sql"
                style={customCoyStyle}
                showLineNumbers
              >
                {formattedCode}
              </SyntaxHighlighter>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SQL_EditorModal;
