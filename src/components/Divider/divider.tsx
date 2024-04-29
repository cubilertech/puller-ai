import { DividerVariant } from "@/utils/types";
import { Divider as MuiDivider, SxProps } from "@mui/material";
import { FC } from "react";

interface DividerProps {
  variant?: DividerVariant;
  type: "dark" | "light";
  sx?: SxProps;
}

const Divider: FC<DividerProps> = ({ variant, type }) => {
  return (
    <MuiDivider
      variant={variant}
      sx={{
        bgcolor: type === "dark" ? "rgba(90, 90, 90, 1)" : "",
      }}
    />
  );
};

export default Divider;
