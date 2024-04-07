import { Divider as MuiDivider } from "@mui/material";
import { FC } from "react";

interface DividerProps {
  variant?: "fullWidth" | "middle" | "inset";
  type: "dark" | "light";
}

const Divider: FC<DividerProps> = ({ variant, type }) => {
  return (
    <>
      <MuiDivider
        variant={variant}
        sx={{
          bgcolor: type === "dark" ? "rgba(90, 90, 90, 1)" : "",
        }}
      />
    </>
  );
};

export default Divider;
