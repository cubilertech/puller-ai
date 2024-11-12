"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Logo } from "@/components/logo";
import { palette } from "@/theme/Palette";
import {
  Box,
  Input,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CustomLink } from "@/components/Link";
import { useSubmitNewPassword } from "@/hooks/useLogin";
import { useSelector } from "react-redux";
import { getUserName } from "@/libs/redux/features/validateRequest";

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  password: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Password is required"),
});

const EnterPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const UserName = useSelector(getUserName);
  const { mutate, isSuccess, isError } = useSubmitNewPassword();

  const formik = useFormik({
    initialValues: {
      username: UserName ?? "",
      password: "",
      newPassword: "",
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      const session = localStorage.getItem("session");
      const challenge = localStorage.getItem("challenge");
      mutate({
        session: session,
        username: values.username,
        challenge: challenge,
        response: { NEW_PASSWORD: values.password },
      });
      setIsLoading(true);
    },
  });

  const handleButtonClick = (event: any) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setIsLoading(false);
    }
  }, [isSuccess]);

  return (
    <Box p={"2%"} height={"100vh"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
          gap: "40px",
        }}
      >
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
          <Box>
            <Logo variant="default" />
          </Box>
          <Paper
            variant="light-bg-border"
            sx={{ width: "100%", px: "40px", pt: "40px", pb: "25px" }}
          >
            <Typography variant="h4">Confirm Password</Typography>
            <Typography component={"p"} variant="text-md-medium" sx={{ mt: 2 }}>
              Provide your Password to get started
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 2.4 }}>
                <Typography variant="text-sm-medium">User Name</Typography>
                <Input
                  disableUnderline
                  fullWidth
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Enter username"
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                    mt: 0.5,
                  }}
                />
                {formik.errors.username && formik.touched.username ? (
                  <Typography color="error">
                    {formik.errors.username}
                  </Typography>
                ) : null}
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="text-sm-medium">New Password</Typography>
                <Input
                  disableUnderline
                  fullWidth
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  placeholder="Enter New Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        edge="end"
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: "100%",
                          ":hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                    mt: 0.5,
                  }}
                />
                {formik.errors.newPassword && formik.touched.newPassword ? (
                  <Typography color="error">
                    {formik.errors.newPassword}
                  </Typography>
                ) : null}
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="text-sm-medium">
                  Confirm Password
                </Typography>
                <Input
                  disableUnderline
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter Confirm password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: "100%",
                          ":hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                    mt: 0.5,
                  }}
                />
                {formik.errors.password && formik.touched.password ? (
                  <Typography color="error">
                    {formik.errors.password}
                  </Typography>
                ) : null}
              </Box>
              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  label="Login"
                  disabled={isLoading}
                  onClick={handleButtonClick}
                />
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  mt: 2,
                  gap: 0.5,
                }}
              >
                <Typography variant="text-md-semibold">
                  Don’t have an account?{" "}
                </Typography>
                <CustomLink
                  href="#"
                  variant="simple"
                  color={palette.primary.light}
                >
                  Register Here
                </CustomLink>
              </Box>
            </form>
          </Paper>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="text-sm-medium"
              color={palette.color.gray[750]}
            >
              © 2024 Puller AI
            </Typography>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <CustomLink href="#" variant="simple">
                Terms & Condition
              </CustomLink>
              <Box
                sx={{
                  width: "1px",
                  height: "20px",
                  bgcolor: "#ACB5BB",
                  mt: 0.5,
                }}
              ></Box>
              <CustomLink href="#" variant="simple">
                Privacy & Policy
              </CustomLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EnterPassword;
