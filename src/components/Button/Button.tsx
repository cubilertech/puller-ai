"use client";
import { customTheme } from "@/theme/CustomTheme";
import { Box, Button as MuiButton } from "@mui/material";
import { FC } from "react";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  variant: "contained" | "outlined" | "text";
  disabled?: boolean;
  fullWidth?: boolean;
  textTransform?: "capitalize" | "lowercase" | "uppercase" | "inherit";
}

const Button: FC<ButtonProps> = ({
  size = "medium",
  label,
  variant,
  disabled,
  fullWidth,
  onClick,
  ...rest
}) => {
  return (
    <MuiButton
      {...rest}
      size={size}
      type="button"
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
