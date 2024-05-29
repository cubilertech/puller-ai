"use client";
import { Button } from "@/components/Button";
import { useResetData } from "@/hooks/useResetData";
import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";

function EmptyButton() {
  const { mutate, isLoading } = useResetData();

  const handleClick = async () => {
    mutate();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        gap: 10,
      }}
    >
      <Typography variant="display-md-medium" color={palette.base.white}>
        Reset Your Application Data
      </Typography>
      <Box sx={{ width: 200 }}>
        <Button
          size="large"
          variant="contained"
          onClick={handleClick}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Emptying..." : "Reset Data"}
        </Button>
      </Box>
    </Box>
  );
}

export default EmptyButton;
