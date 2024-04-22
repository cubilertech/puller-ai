import { Box, Button as MuiButton, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "contained" | "outlined" | "text";
  disabled?: boolean;
  fullWidth?: boolean;
  textTransform?: "capitalize" | "lowercase" | "uppercase" | "inherit";
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  children?: ReactNode;
  sx?: SxProps;
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
  children,
  sx,
  ...props
}) => {
  return (
    <div
      className={
        variant === "outlined"
          ? // ? "btn-container"
            ""
          : variant === "contained"
            ? "contained-container"
            : ""
      }
    >
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
        sx={sx}
      >
        {label || children}
      </MuiButton>
    </div>
  );
};

export default Button;
