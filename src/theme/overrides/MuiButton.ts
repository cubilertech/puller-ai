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
          boxShadow: "none",
          "&:hover": {
            color: palette.base.white,
            boxShadow: "none",
            background:
              "linear-gradient(54deg, rgba(108,33,177,1) 16%, rgba(26,138,169,1) 100%)",
            borderRadius: "8px",
          },
        },

        outlined: {
          color: palette.base.white,
          borderRadius: "8px",
          border: "none",
          background: "#627177",

          "&:hover": {
            border: "none",
            background:
              "linear-gradient(54deg, rgba(108,33,177,1) 16%, rgba(26,138,169,1) 100%)",
            borderRadius: "8px",
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
