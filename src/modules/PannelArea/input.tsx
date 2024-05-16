import { FC } from "react";

interface CustomInputProps {
  onChange?: (event: any) => void;
  value?: string;
  disabled: boolean;
}

export const CustomInput: FC<CustomInputProps> = ({
  onChange,
  value,
  disabled,
}) => {
  return (
    <textarea
      value={value}
      autoFocus
      disabled={disabled}
      placeholder="Type your data request (prompt) here..."
      style={{
        boxSizing: "border-box",
        borderRadius: "5px",
        width: "100%",
        // height: "100%",
        // minHeight: "100%",
        // maxHeight: "16rem",
        // height: "5rem",
        alignItems: "flex-start",
        // overflowY: "auto",
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
