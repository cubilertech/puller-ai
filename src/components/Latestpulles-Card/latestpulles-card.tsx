import { palette } from "@/theme/Palette";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
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
        height: { lg: "258px", xs: "220px" },
        width: { lg: "320px", xs: "280px" },
        margin: 0,
        padding: "22px",
        ":hover": {
          background: palette.linearGradient.darkBlue,
          cursor: "pointer",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Typography variant="text-md-medium">{query}</Typography>
      </Box>
    </Paper>
  );
};
export default LatestPullesCard;
