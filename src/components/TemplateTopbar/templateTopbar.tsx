import { Box, Typography } from "@mui/material";
import { FC } from "react";
import Input from "../Input/input";
import { ACTIVE_TYPES } from "@/utils/constants";

interface TemplateTopbarProps {
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateTopbar: FC<TemplateTopbarProps> = ({ isActive, setIsActive }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        mb: "2rem",
        height: "5%",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          onClick={() => setIsActive(ACTIVE_TYPES.PUBLIC)}
          sx={{
            borderBottom:
              isActive === "public"
                ? "1px solid rgb(0,224,238)"
                : "1px solid rgb(114,121,129)",

            width: "202px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: "5px",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="text-md-regular">Public</Typography>
        </Box>

        <Box
          onClick={() => setIsActive(ACTIVE_TYPES.PRIVATE)}
          sx={{
            borderBottom:
              isActive === "private"
                ? "1px solid rgb(0,224,238)"
                : "1px solid rgb(114,121,129)",
            textAlign: "center",
            width: "202px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pb: "5px",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="text-md-regular">Private</Typography>
        </Box>
      </Box>

      <Input placeholder="Search..." icon="search" width={230} height={40} />
    </Box>
  );
};

export default TemplateTopbar;
