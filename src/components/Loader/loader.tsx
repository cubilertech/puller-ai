import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { palette } from "@/theme/Palette";

interface LoaderProps {
  varient: "simple" | "paper";
}

const Loader: FC<LoaderProps> = ({ varient }) => {
  switch (varient) {
    case "simple":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon icon="logoIcon" width={240} height={260} />
          <Typography variant="display-xs-medium" color={palette.base.white}>
            Processing..
          </Typography>
        </Box>
      );
    case "paper":
      return (
        <Paper type="light-border">
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              p: 20,
              alignItems: "center",
            }}
          >
            <Icon icon="logo" width={200} height={220} />
            <Typography variant="display-xs-medium" color={palette.base.white}>
              Processing..
            </Typography>
          </Box>
        </Paper>
      );
  }
};

export default Loader;
