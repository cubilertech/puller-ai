import { palette } from "@/theme/Palette";
import { Paper } from "../Paper";
import { Typography } from "@mui/material";
import { FC } from "react";
import { LatestPullesCardDataProps } from "@/utils/types";

interface LatestPullesCardProps {
  data: LatestPullesCardDataProps;
  onClick: () => void;
}

const LatestPullesCard: FC<LatestPullesCardProps> = ({ data, onClick }) => {
  return (
    <Paper
      onClick={onClick}
      variant="dark-border"
      sx={{
        border: `1px solid ${palette.color.gray[700]}`,
        height: "180px",
        width: "100%",
        margin: 0,
        padding: 2,
        pr: 4,
        ":hover": {
          background: palette.linearGradient.darkBlue,
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="text-md-medium">{data.text}</Typography>
    </Paper>
  );
};
export default LatestPullesCard;
