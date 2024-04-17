import { Typography } from "@mui/material";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC } from "react";

interface RectangleCardProps {
  icon: "connectApps" | "apiKey" | "upload";
  title: string;
}

const RectangleCardWithIcon: FC<RectangleCardProps> = ({ icon, title }) => {
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
    >
      <Icon icon={icon} height={64} width={64} />
      <Typography variant="text-md-semibold">{title}</Typography>
    </Paper>
  );
};

export default RectangleCardWithIcon;
