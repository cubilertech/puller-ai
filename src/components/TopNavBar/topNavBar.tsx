import { palette } from "@/theme/Palette";
import { Box } from "@mui/material";
import IconButton from "../IconButton/iconButton";
import { ArrowBack } from "@mui/icons-material";

const TopNavBar = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "20px 48px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "211px",
          bgcolor: "rgba(102, 112, 133, 0.60)",
        }}
      >
        <IconButton icon={"/next.svg"} />
      </Box>
    </>
  );
};
export default TopNavBar;
