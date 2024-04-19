"use client";
import { Typography } from "@mui/material";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC, MouseEvent } from "react";

interface RectangleCardProps {
  icon: "connectApps" | "apiKey" | "upload";
  title: string;
  onClick?: () => void;
}

const RectangleCardWithIcon: FC<RectangleCardProps> = ({
  icon,
  title,
  onClick,
}) => {
  return (
    <Paper
      type="light-border"
      sx={{
        width: "350px",
        height: "92px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.8rem",
        paddingLeft: "15px",
      }}
      onClick={onClick}
    >
      <Icon icon={icon} height={64} width={64} />
      <Typography variant="text-md-semibold">{title}</Typography>
    </Paper>
  );
};

export default RectangleCardWithIcon;
