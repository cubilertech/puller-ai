import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";

const Login = () => {
  return (
    <Box
      sx={{
        bgcolor: "#363636",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {/* <Typography variant="display-2xl-bold">Test</Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5rem",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            width: "725px",
            height: "865px",
            padding: "27px 0px 28px 0px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: "0",
            borderRadius: 16,
            border: "2px solid rgba(196, 196, 196, 0.60)",
            background:
              "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Image src="./logo_icon.svg" alt="logo" />
            <Image src="./logo-text.svg" alt="logo" />
          </Box>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          Logo
          <Paper>Login</Paper>
          footer
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
