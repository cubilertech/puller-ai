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
        height: "100%",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      <Paper
        type="light-border"
        sx={{
          height: { xl: "516px", lg: "350px", md: "216px" },
          margin: 0,
          padding: 0,
          width: { xl: "704px", lg: "504px", md: "403px" },
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
