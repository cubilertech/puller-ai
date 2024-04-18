import { Box, Modal, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { format } from "sql-formatter";
import "./style.css";
import { Paper } from "@/components/Paper";
import { Button } from "@/components/Button";
import { Close } from "@mui/icons-material";
import Divider from "@/components/Divider/divider";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
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
  // State to store the formatted code
  const [formattedCode, setFormattedCode] = useState<string>("");

  // Function to format the code using Prettier
  useEffect(() => {
    setFormattedCode(format(code, { language: "mysql" }));
  }, [code]);
// Function to add line numbers to the code and color individual words
const addLineNumbers = (code: string) => {
  return code.split("\n").map((line, index) => {
    const words = line.split(/(\b)/); // Split line into words preserving word boundaries

    // Map each word to its appropriate color
    const coloredWords = words.map((word, wordIndex) => {
      let color = '#98A2B3'; // Default color

      // Check if the word ends with "("
      const endsWithParenthesis = word.endsWith("(");

      // Check if the word is within a string
      const inString = line.includes(word) && line.trim().startsWith('"') && line.trim().endsWith('"');

      // Check if the word is a variable (assuming variables start with $ or _)
      const isVariable = !inString && !endsWithParenthesis && /\b(\$|_)?[a-zA-Z][$\w]*\b/.test(word);
      // Check if the word is a number
      const isNumber = !inString && !endsWithParenthesis && /^\s*\d+(\.\d+)?\s*$/.test(word);

      if (inString) {
        color = '#c6807c'; // Change color for words within a string
      } else if (isVariable) {
        color = 'blue'; // Change color for variables
      } else if (isNumber) {
        color = 'green'; // Change color for numbers
      }

      if (endsWithParenthesis) {
        // If the word ends with "(", we only change the color of the word itself
        const wordWithoutParenthesis = word.substring(0, word.length - 1); // Remove the parenthesis
        return (
          <span key={wordIndex}>
            <span style={{ color }}>{wordWithoutParenthesis}</span>
            {"("}
          </span>
        );
      }

      return <span key={wordIndex} style={{ color }}>{word}</span>;
    });

    // Return the line with colored words
    return (
      <div key={index} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "30px",
            marginRight: "10px",
            textAlign: "right",
            paddingRight: "5px",
            color: "#98A2B3",
          }}
        >
          {index + 1}
        </div>
        <div>{coloredWords}</div>
      </div>
    );
  });
};

  // Add line numbers to the formatted code
  const codeWithLineNumbers = addLineNumbers(formattedCode);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Paper type="dark-border" sx={{ padding: 3, height: "626px" }}>
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
              width: "600px",
              mt: 1,
              maxHeight: "500px",
              overflow: "auto",
              scrollbarWidth: "none",
            }}
          >
            {/* Display formatted code with line numbers */}
            <Typography
              component="div"
              sx={{ whiteSpace: "pre-wrap", lineHeight: "30px" }}
            >
              {codeWithLineNumbers}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SQL_EditorModal;
