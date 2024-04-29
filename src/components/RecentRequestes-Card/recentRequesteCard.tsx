import { FC } from "react";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";

interface RequestsCardProps {
  title: string;
  discription: string;
}

const RequestsCard: FC<RequestsCardProps> = ({ title, discription }) => {
  return (
    <Paper
    variant="light-border"
      sx={{
        padding: "20px",
        maxWidth: "100%",
        height: "212px",
        cursor: "pointer",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        {/* Card Header & Icon */}
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

        {/* Card Description */}
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
export default RequestsCard;
