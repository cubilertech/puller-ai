import { FC } from "react";
import { IconButton as MuiIconButton, Typography } from "@mui/material";
import Image from "next/image";

interface IconButtonProps {
  icon?: string; // Ensure icon is always defined
  text?: string;
  iconWidth?: number; // Explicit type for icon width
  iconHeight?: number; // Explicit type for icon height
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  text,
  iconWidth = 40,
  iconHeight = 40,
  ...props
}) => {
  return (
    <MuiIconButton {...props}>
      {icon && (
        <Image src={icon} alt="Icon" width={iconWidth} height={iconHeight} />
      )}
      <Typography>{text}</Typography>
    </MuiIconButton>
  );
};

export default IconButton;
