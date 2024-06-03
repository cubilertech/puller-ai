import { palette } from "@/theme/Palette";
import { Paper } from "../Paper";
import { Typography } from "@mui/material";
import { FC } from "react";
import { LatestPullesCardDataProps } from "@/utils/types";
import { motion } from "framer-motion";

interface LatestPullesCardProps {
  query: string | undefined;
  onClick: () => void;
}

const LatestPullesCard: FC<LatestPullesCardProps> = ({ query, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      variant="dark-border"
      sx={{
        border: `1px solid ${palette.color.gray[700]}`,
        height: "310px",
        width: "100%",
        maxWidth: "320px",
        minWidth: "280px",
        margin: 0,
        padding: "22px",
        ":hover": {
          background: palette.linearGradient.darkBlue,
          cursor: "pointer",
        },
      }}
    >
      <Typography
        variant="text-md-medium"
        sx={{
          // overflow: "hidden",
          // display: "-webkit-box",
          // WebkitLineClamp: 6,
          // WebkitBoxOrient: "vertical",
        }}
      >
        {query}
      </Typography>
    </Paper>
  );
};
export default LatestPullesCard;
