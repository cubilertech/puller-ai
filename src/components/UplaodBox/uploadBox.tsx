import { Box, Input } from "@mui/material";
import { UploadCard } from "../UploadCard";

const data = [1, 2, 3];

const UploadBox = () => {
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gap={"1.4rem"}
      mb={"2rem"}
    >
      {data.map((item, index) => (
        <Box display={"flex"} flexDirection={"column"} gap={"1rem"} key={index}>
          <UploadCard />
          <Input
            disableUnderline
            placeholder="Add additional context here"
            sx={{
              border: "2px solid rgba(196, 196, 196, 0.6)",
              borderRadius: "5px",
              padding: "0.1rem 0.5rem",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default UploadBox;
