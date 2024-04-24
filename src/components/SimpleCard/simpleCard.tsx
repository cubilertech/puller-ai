import { FC } from "react";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";

interface SimpleCardProps {
  title: string;
  discription: string;
  isFor: "Results" | "Requests";
}

const SimpleCard: FC<SimpleCardProps> = ({ title, discription, isFor }) => {
  return (
    <Paper
      type="light-border"
      sx={{
        padding: "20px",
        maxWidth: isFor === "Results" ? "100%" : "278px",
        height: "212px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="text-md-semibold">{title}</Typography>
          <Icon icon="outlinedBookMark" width={24} height={24} />
        </Box>

        <Typography
          variant="text-xs"
          sx={{
            mt: 2.1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 8,
            WebkitBoxOrient: "vertical",
          }}
        >
          {discription}
        </Typography>
      </Box>
    </Paper>
  );
};
export default SimpleCard;
