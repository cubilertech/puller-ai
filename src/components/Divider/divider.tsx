import { DividerVariant } from "@/utils/types";
import { Divider as MuiDivider, SxProps } from "@mui/material";
import { FC } from "react";

interface DividerProps {
  variant?: DividerVariant;
  type: "dark" | "light";
  sx?: SxProps;
}

const Divider: FC<DividerProps> = ({ variant, type, sx }) => {
  return (
    <MuiDivider
      variant={variant}
      sx={{
        borderColor:
          type === "dark" ? "#5A5A5A" : "rgba(90, 90, 90, 1)",
        ...sx,
      }}
    />
  );
};

export default Divider;
