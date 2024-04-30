"use client";
import { Box, Typography } from "@mui/material";
import { CSSProperties, FC, useEffect, useState } from "react";
import "./style.css";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Close } from "@mui/icons-material";
import Divider from "@/components/Divider/divider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";

interface SQL_EditorProps {
  handleClose: () => void;
  code: string;
}

const SQL_Editor: FC<SQL_EditorProps> = ({ handleClose, code }) => {
  const [formattedCode, setFormattedCode] = useState<string>("");

  useEffect(() => {
    setFormattedCode(format(code, { language: "mysql" }));
  }, []);
  const customCoyStyle = {
    ...coy,
    'code[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      scrollbarWidth: "none" as CSSProperties["scrollbarWidth"],
      width: "100%",
      height: "100%",
    },
    'pre[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      scrollbarWidth: "none" as CSSProperties["scrollbarWidth"],
      width: "100%",
      height: "100%",
    },
    'span[class="token"]': {
      ...coy['span[class="token"]'],
      background: "transparent",
      fontSize: "16px !important",
    },
  };
  return (
    <Paper
      variant="dark-border"
      sx={{
        height: "98%",
        padding: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography variant="display-sm-medium">SQL Editor</Typography>
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
          height: "calc(100vh  - 326px)",
        }}
      >
        {/* Display formatted code with line numbers   */}
        <SyntaxHighlighter
          language="sql"
          style={customCoyStyle}
          showLineNumbers
        >
          {formattedCode}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  );
};

export default SQL_Editor;
