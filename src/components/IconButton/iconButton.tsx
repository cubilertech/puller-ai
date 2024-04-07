import { FC } from "react";
import { IconButton as MuiIconButton, Typography } from "@mui/material";
import Image from "next/image";
import Icon from "../Icon/icon";
import { IconTypes } from "@/utils/types";

interface IconButtonProps {
  icon?: IconTypes; // Ensure icon is always defined
  text?: string;
  iconWidth?: number; // Explicit type for icon width
  iconHeight?: number;
  fullWidth?: boolean; // Explicit type for icon height
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  text,
  iconWidth = 40,
  iconHeight = 40,
  fullWidth,
  ...props
}) => {
  return (
    <MuiIconButton {...props} sx={{ width: fullWidth ? "100%" : "auto" }}>
      {icon && <Icon icon={icon} width={iconWidth} height={iconHeight} />}
      <Typography>{text}</Typography>
    </MuiIconButton>
  );
};

export default IconButton;
