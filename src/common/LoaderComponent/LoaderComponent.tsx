import { Loader } from "@/components/Loader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";

const LoaderComponent = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        height: "80vh",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      <Paper
        type="dark-border"
        sx={{
          height: "100%",
          margin: 0,
          padding: 0,
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader varient="simple" />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoaderComponent;
