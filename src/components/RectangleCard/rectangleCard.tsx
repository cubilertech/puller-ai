import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC } from "react";
import "./rectangleCard.css";
import { RectangleCardIcons } from "@/utils/types";

interface RectangleCardProps {
  icon: RectangleCardIcons;
  title: string;
  onClick?: () => void;
}

const RectangleCard: FC<RectangleCardProps> = ({ icon, title, onClick }) => {
  return (
    <Paper
      variant="light-border"
      sx={{
        // width: { xl: "350px", lg: "280px" },
        width: "100%",
        height: { xl: "92px", lg: "92px" },
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.8rem",
        paddingLeft: "15px",
        borderRadius: "8px",
        ":hover": {
          cursor: "pointer",
          background:
            "linear-gradient(142.96deg, rgba(93, 146, 254, 0.148) -3.54%, rgba(93, 146, 254, 0.168) 95.15%)",
          "& .child": {
            background: "rgb(115,129,161)",
          },
        },
      }}
      onClick={onClick}
    >
      <div className="rectangle-card-container">
        <Box
          sx={{
            background: "rgb(112,112,129)",
            width: 60,
            height: 60,
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            ":hover": {
              background: "rgba(93, 146, 254, 0.3)",
            },
          }}
          className="child"
        >
          <Icon icon={icon} height={30} width={30} />
        </Box>
      </div>

      <Typography variant="text-md-semibold">{title}</Typography>
    </Paper>
  );
};

export default RectangleCard;
