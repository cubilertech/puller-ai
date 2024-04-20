import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { palette } from "@/theme/Palette";
import "./loader.css";

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
          {/* <Typography variant="display-xs-medium" color={palette.base.white}>
            Processing..
          </Typography> */}
          <Typography
            variant="display-xs-medium"
            className="typing-animation"
          ></Typography>
          {/* <div className="typing-animation"></div> */}
        </Box>
      );
    case "paper":
      return (
        <Paper type="light-border" sx={{ width: "100%", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Icon icon="logoIcon" width={260} height={280} />
            <Typography variant="display-xs-medium" color={palette.base.white}>
              Processing..
            </Typography>
          </Box>
        </Paper>
      );
  }
};

export default Loader;
