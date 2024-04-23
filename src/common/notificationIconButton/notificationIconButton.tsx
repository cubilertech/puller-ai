import { FC } from "react";
import { Box, IconButton as MuiIconButton, Typography } from "@mui/material";
import { Icon } from "@/components/Icon";
import { IconTypes } from "@/utils/types";
import "./notificationIconButton.css";

interface IconButtonProps {
  icon?: IconTypes;
  text?: string;
  iconWidth?: number; // Explicit type for icon width
  iconHeight?: number; // Explicit type for icon height
  isNotice?: boolean;
}

const NotificationIconButton: FC<IconButtonProps> = ({
  icon,
  text,
  iconWidth = 40,
  iconHeight = 40,
  isNotice,
  ...props
}) => {
  return (
    <div className="container-notification">
      <MuiIconButton
        sx={{ position: "relative", borderRadius: "100%" }}
        {...props}
      >
        {isNotice && (
          <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
            <Icon icon="ellipse" width={12} height={12} />
          </Box>
        )}

        {icon && <Icon icon={icon} width={iconWidth} height={iconHeight} />}
        {text && <Typography variant="text-xxs-bold">{text}</Typography>}
      </MuiIconButton>
    </div>
  );
};

export default NotificationIconButton;
