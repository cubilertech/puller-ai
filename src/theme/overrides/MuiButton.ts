import { Theme } from "@mui/material/styles";
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
          minWidth: "34px",
          padding: "10px",
          borderRadius: "16px",
          textTransform: "none" as const,
          zIndex: 4,
          border: "none",
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
            background: "rgba(105,65,198,255)",
          },
        },
        outlined: {
          color: palette.base.white,
          borderRadius: "8px",
          border: "none",
          // background: "#7c7586",
          background: "rgba(255, 255, 255, 0.3)",

          "&:hover": {
            border: "none",
            // backgroundColor: "rgb(95,112,125)",
            background: "rgba(255, 255, 255, 0.3)",
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
