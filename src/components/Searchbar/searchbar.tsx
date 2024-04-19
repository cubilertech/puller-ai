import { Box, Input, InputAdornment } from "@mui/material";
import { Icon } from "../Icon";
import { FC } from "react";

interface SearchbarProps {
  width?: number;
  height?: number;
}

const Searchbar: FC<SearchbarProps> = ({ width = 220, height = 40 }) => {
  return (
    <Box>
      <div className="input-container">
        <Input
          placeholder="Search ..."
          disableUnderline
          sx={{
            background: "rgba(255, 255, 255, 0.2)",
            zIndex: 2,
            border: 0,
            padding: "10px 16px 10px 16px",
            height: height,
            width: width,
            borderRadius: "8px",
          }}
          startAdornment={
            <InputAdornment position="start">
              <Icon icon="search" />{" "}
            </InputAdornment>
          }
        />
      </div>
    </Box>
  );
};

export default Searchbar;
