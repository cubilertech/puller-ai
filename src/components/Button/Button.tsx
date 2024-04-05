"use client";
import { customTheme } from "@/theme/CustomTheme";
import { Box, Button as MuiButton } from "@mui/material";
import { FC, ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  variant: "contained" | "outlined" | "text";
  disabled?: boolean;
  fullWidth?: boolean;
  textTransform?: "capitalize" | "lowercase" | "uppercase" | "inherit";
  endIcon?: ReactNode;
  startIcon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  size = "medium",
  label,
  variant,
  disabled,
  fullWidth,
  onClick,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <div className={variant === "outlined" ? "container" : ""}>
      <MuiButton
        {...props}
        size={size}
        type="button"
        onClick={onClick}
        variant={variant}
        disabled={disabled}
        fullWidth={fullWidth}
        endIcon={endIcon}
        startIcon={startIcon}
      >
        {label}
      </MuiButton>
    </div>
  );
};

export default Button;
