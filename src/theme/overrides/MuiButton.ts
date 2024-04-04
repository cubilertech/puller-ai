import { Theme } from "@mui/material/styles";
import { customTheme } from "../CustomTheme";
import { palette } from "../Palette";

export const MuiButton = (theme: Theme) => {
  return {
    MuiButton: {
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
          maxWidth: "458px",
          padding: "10px",
          borderRadius: "16px",
          textTransform: "none" as const,
          zIndex: 4,
        },
        contained: {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        },
        outlined: {
          color: theme.palette.primary.main,
          border: `2px solid  ${theme.palette.primary.main} `,
          "&:hover": {
            border: `2px solid  ${theme.palette.primary.light} `,
            color: theme.palette.primary.light,
            backgroundColor: "transparent",
          },
        },
        text: {
          color: palette.error[500 as keyof typeof palette.warning],
          "&:hover": {
            color: theme.palette.primary.light,
            backgroundColor: "transparent",
          },
        },
      },
    },
  };
};
