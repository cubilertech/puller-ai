import { FC } from "react";
import { Box, IconButton as MuiIconButton, Typography } from "@mui/material";
import { Icon } from "@/components/Icon";
import { IconTypes } from "@/utils/types";
import "./notificationIconButton.css";
import { palette } from "@/theme/Palette";

interface IconButtonProps {
  icon: IconTypes;
  text?: string;
  iconWidth?: number;
  iconHeight?: number;
  isNotice?: boolean;
  onClick?: () => void;
}

const NotificationIconButton: FC<IconButtonProps> = ({
  icon,
  text,
  iconWidth = 40,
  iconHeight = 40,
  isNotice,
  onClick,
  ...props
}) => {
  return (
    <div className="container-notification">
      <MuiIconButton
        sx={{
          position: "relative",
          borderRadius: "100%",
          bgcolor: `${palette.color.gray[400]}`,
          ":hover": {
            bgcolor: `${palette.color.gray[300]}`,
          },
        }}
        onClick={onClick}
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
