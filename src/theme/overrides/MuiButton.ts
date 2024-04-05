import { Theme } from "@mui/material/styles";
import { customTheme } from "../CustomTheme";
import { palette } from "../Palette";

export const MuiButton = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-sizeSmall": {
            height: "30px",
          },
          "&.MuiButton-sizeMedium": {
            height: "44px",
          },
          "&.MuiButton-sizeLarge": {
            height: "45px",
          },
          // maxWidth: "458px",
          padding: "10px",
          borderRadius: "16px",
          textTransform: "none" as const,
          zIndex: 4,
        },
        contained: {
          borderRadius: "8px",
          border:
            "1px solid linear-gradient(to right, #FFFFFF 0%,#FFFFFF 40%,#FFFFFF 40%, #FFFFFF 60%,#FFFFFF 60%,#FFFFFF 100%)#FFF)",
          background: "#5D92FE",
          color: palette.base.white,
          backdropFilter: "blur(8px)",

          "&:hover": {
            color: palette.base.white,
            background: "#5D92FE",
          },
        },
        outlined: {
          color: palette.base.white,
          borderRadius: "8px",
          border: "none",
          background: "#7c7586",
          backdropFilter: "blur(8px)",
          "&:hover": {
            color: palette.base.white,
            border: "none",
            backgroundColor: "#FFFFFF4D 30%, rgba(255, 255, 255, 0.40)",
          },
        },
        text: {
          display: "flex",
          color: palette.base.white,
          gap: "12px",
          border: "1px solid transparent",
          borderRadius: "8px",
          "&:hover": {
            color: palette.base.white,
            borderRadius: "8px",
            border: "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
            background: "var(--buttons, rgba(255, 255, 255, 0.30))",
            backdropFilter: "blur(8px)",
          },
        },
      },
    },
  };
};
