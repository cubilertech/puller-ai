// import { Theme, Tooltip, TooltipProps, styled } from "@mui/material";

import { Theme } from "@mui/material";

// // Define your custom styles for the Tooltip
// const CustomTooltip = styled(Tooltip)(({ theme }: { theme: Theme }) => ({
//   // Add your custom styles here
//   // Example:
//   "&.MuiTooltip-tooltip": {
//     // Override default styles
//     backgroundColor: "red",
//     color: "white",
//     fontSize: "44px",
//     borderRadius: "4px",
//     // Add any other custom styles you want
//   },
// }));

// // Define the props for your custom Tooltip component
// type CustomTooltipProps = TooltipProps;

// // Export your custom Tooltip component
// export default CustomTooltip;

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
