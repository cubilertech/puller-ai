import { FC } from "react";

interface CustomInputProps {
  onChange?: (event: any) => void;
  disabled: boolean;
}

export const CustomInput: FC<CustomInputProps> = ({ onChange, disabled }) => {
  return (
    <textarea
      autoFocus
      disabled={disabled}
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
        color: disabled ? "#738285" : "#fff",
        fontFamily: "inherit", // Inherit font family for consistency
      }}
      onChange={onChange}
    />
  );
};
