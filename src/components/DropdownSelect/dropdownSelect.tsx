"use client";
import { Box, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";

interface DropDownSelectProps {
  value?: string | number | undefined;
  onChange?: () => void;
}

const DropdownSelect: FC<DropDownSelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Event handler to handle the opening of the Select
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Event handler to handle the closing of the Select
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box display={"flex"} width={"100%"} justifyContent={"center"}>
      <Select
        labelId="demo-controlled-open-select-label"
        variant="standard"
        fullWidth
        disableUnderline
        defaultValue={10}
        open={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        value={value}
        onChange={onChange}
        sx={{
          border: "2px solid rgba(196, 196, 196, 0.60)",
          width: "15rem",
          //   background:
          //     "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
          background: "rgb(78,92,99)",
          color: "white",
          boxShadow: "none",
          borderRadius: isOpen ? 0 : "8px",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
          "&:focus": {
            bgcolor: "transparent",
          },
          padding: "0 10px",
          borderBottom: isOpen ? "0" : "2px solid rgba(196, 196, 196, 0.60)",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              border: "2px solid rgba(196, 196, 196, 0.60)",
              borderTop: "none",
              //   background:
              //     "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
              background: "rgb(78,92,99)",
              color: "white",
              boxShadow: "none",
              borderRadius: 0,
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
      >
        <MenuItem
          sx={{
            width: "14.78rem",
          }}
          value={10}
        >
          Data
        </MenuItem>
        <MenuItem value={20}>Data</MenuItem>
        <MenuItem value={30}>Data</MenuItem>
        <MenuItem value={40}>Data</MenuItem>
      </Select>
    </Box>
  );
};

export default DropdownSelect;
