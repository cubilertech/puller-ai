import { palette } from "@/theme/Palette";
import { MenuItemType } from "@/utils/types";
import { MenuItem, Menu as MuiMenu } from "@mui/material";
import { FC } from "react";

interface MenuProps {
  open: boolean;
  menuItems: MenuItemType[];
  anchorEl: Element | null;
  onClose: () => void;
}

const Menu: FC<MenuProps> = ({ open, menuItems, anchorEl, onClose }) => {
  return (
    <MuiMenu
      sx={{
        width: 252,
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: 122,
          marginTop: 45,
          borderRadius: "5px",
          border: "2px solid rgba(196, 196, 196, 0.60)",
          background:
            "linear-gradient(142.96deg, rgba(68,74,89,255) -3.54%,  rgba(68,74,89,255) 7.55%, rgba(55,61,74,255) 95.15%)",
          color: palette.base.white,
          backdropFilter: "blur(20px)",
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {item.text}
        </MenuItem>
      ))}
    </MuiMenu>
  );
};
export default Menu;
