import { Theme } from "@mui/material/styles";
import { palette } from "../Palette";

export const MuiIconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-sizeSmall": {
            height: "40px",
          },
          "&.MuiButton-sizeMedium": {
            height: "42px",
          },
          "&.MuiButton-sizeLarge": {
            height: "45px",
          },
          borderRadius: "8px",
          border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
          background:
            "var(--Vision-pro-01, linear-gradient(143deg, rgba(255, 255, 255, 0.22) -3.54%, rgba(114, 114, 114, 0.25) 95.15%))",
          backdropFilter: "blur(8px)",
        },
      },
    },
  };
};
