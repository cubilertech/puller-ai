import { FC } from "react";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";

interface SimpleCardProps {
  title: string;
  discription: string;
}

const SimpleCard: FC<SimpleCardProps> = ({ title, discription }) => {
  return (
    <Paper
      type="light-border"
      sx={{
        padding: "24px 20px",
        maxWidth: "278px",
        height: "212px",
        overflow: "hidden",
      }}
    >
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
    </Paper>
  );
};
export default SimpleCard;
