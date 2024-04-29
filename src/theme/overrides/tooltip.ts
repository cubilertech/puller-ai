import { Theme } from "@mui/material";

export const MuiToolTip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: "16px",
          border: "2px solid rgba(196, 196, 196, 0.60)",
          background:
            "linear-gradient(142.96deg, rgba(68,74,89,255) -3.54%,  rgba(68,74,89,255) 7.55%, rgba(55,61,74,255) 95.15%)",
          backdropFilter: "blur(20px)",
          padding: "1rem",
        },
      },
    },
  };
};
