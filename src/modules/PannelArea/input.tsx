import { Input, TextField } from "@mui/material";
import { FC, useState } from "react";

interface CustomInputProps {
  onChange?: (event: any) => void;
}

export const CustomInput: FC<CustomInputProps> = ({ onChange }) => {
  return (
    <textarea
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
      onChange={onChange}
    />
  );
};
