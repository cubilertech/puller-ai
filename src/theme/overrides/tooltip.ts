import { Theme } from "@mui/material";
import { palette } from "../Palette";

export const MuiToolTip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "10px",
          border: `2px solid ${palette.opacity.gray} `,
          background: palette.linearGradient.tooltip,
          backdropFilter: "blur(20px)",
          padding: "1rem",
        },
      },
    },
  };
};
