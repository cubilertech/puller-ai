"use client";
import {
  Theme,
  ListItemButton,
  styled,
} from "@mui/material";

const MuiListItemButton = styled(ListItemButton)(
  ({ theme }: { theme: Theme }) => ({
    "&.MuiListItemButton-root": {
      display: "flex",
      gap: "12px",
      border: "1px solid transparent",
      borderRadius: "8px",
      "&:hover": {
        borderRadius: "8px",
        background: "rgb(54,75,120)",
        backdropFilter: "blur(8px)",
      },
    },
  })
);
export default MuiListItemButton;
