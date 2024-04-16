import { FC } from "react";
import {
  IconButton as MuiIconButton,
  SxProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { IconTypes } from "@/utils/types";
import { Icon } from "../Icon";
import "./iconButton.css";

interface IconButtonProps {
  icon?: IconTypes;
  text?: string;
  iconWidth?: number; // Explicit type for icon width
  iconHeight?: number;
  fullWidth?: boolean; // Explicit type for icon height
  disabled?: boolean;
  sx?: SxProps;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  text,
  iconWidth = 40,
  iconHeight = 40,
  fullWidth,
  disabled = false,
  sx,
  ...props
}) => {
  return (
    <div className="icon-btn-container">
      <MuiIconButton
        {...props}
        sx={{
          width: fullWidth ? "100%" : "auto",
          ":hover": {
            backgroundColor: "rgb(95,112,125)",
          },
          ...sx,
        }}
      >
        {icon && (
          <Icon disabled icon={icon} width={iconWidth} height={iconHeight} />
        )}
        <Typography>{text}</Typography>
      </MuiIconButton>
    </div>
  );
};

export default IconButton;
