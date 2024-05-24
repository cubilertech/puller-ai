import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Logo } from "@/components/logo";
import { palette } from "@/theme/Palette";
import { CheckBox } from "@mui/icons-material";
import { Box, Input, Typography } from "@mui/material";
import React from "react";

const LoginPage = () => {
  return (
    <Box p={"2%"} height={"100vh"}>
      {/* login section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "480px",
          height: "100%",
          m: "auto",
          alignItems: "center",
        }}
      >
        {/* top logo */}
        <Box>
          <Logo variant="default" />
        </Box>
        {/* login container */}
        <Paper variant="light-bg-border" sx={{ width: "100%", p: "40px" }}>
          <Typography variant="h4">Login</Typography>
          <Typography component={"p"} variant="text-md-medium" sx={{ mt: 2 }}>
            Provide your credentials to get started
          </Typography>
          {/* inputs */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="text-sm-medium">Company Name</Typography>
            <Input
              disableUnderline
              fullWidth
              // onChange={handleNameInput}
              placeholder="Enter company name"
              sx={{
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                border: "2px solid rgba(196, 196, 196, 0.6)",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <CheckBox />
              <Typography
                variant="text-md-medium"
                color={palette.color.gray[750]}
              >
                Remember me
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="text-md-medium"
                color={palette.primary.light}
              >
                Forgot Password
              </Typography>
            </Box>
          </Box>
          <Box sx={{width: "100%", mt: 2 }}>
            <Button variant="contained" size="large" fullWidth label="Login" />
          </Box>
        </Paper>
        {/* footer */}
        <Box></Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
