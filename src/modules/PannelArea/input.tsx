import { Input, TextField } from "@mui/material";

export const CustomInput = () => {
  return (
    <textarea
      //   disableUnderline

      autoFocus
      placeholder="Type your data request (prompt) here..."
      style={{
        boxSizing: "border-box",
        borderRadius: "8px",
        width: "100%",
        minHeight: "100%",
        maxHeight: "8rem",
        height: "5rem",
        alignItems: "flex-start",
        overflowY: "auto",
        resize: "none",
        padding: "0.5rem",
        background: "transparent",
        outline: 0,
      }}
    />
  );
};
