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
          borderRadius: "5px",
          border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
          background: "rgb(115,129,133)",
          backdropFilter: "blur(8px)",
        },
      },
    },
  };
};
