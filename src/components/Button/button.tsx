import { Button as MuiButton, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";
import "./button.css";
import { ButtonTextTransforms } from "@/utils/types";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | undefined;
  variant: "contained" | "outlined" | "text";
  disabled?: boolean;
  fullWidth?: boolean;
  textTransform?: ButtonTextTransforms;
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
  const buttonClass =
    variant === "outlined"
      ? "btn-container"
      : variant === "contained"
        ? "contained-container"
        : "";
  return (
    <div className={buttonClass}>
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
