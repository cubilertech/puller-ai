"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Logo } from "@/components/logo";
import { palette } from "@/theme/Palette";
import { CheckBox } from "@mui/icons-material";
import { Box, Input, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string().required("Password is required"),
});


const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      localStorage.setItem("companyName", values.companyName);
      router.push("/request");
      setIsLoading(true)
    },
  });
  const handleButtonClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    formik.handleSubmit();
  };
  useEffect(() => {
    const CompanyName = localStorage.getItem("companyName");
    if (CompanyName) {
      router.push("/request");
    }
  }, []);
  return (
    <Box p={"2%"} height={"100vh"}>
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
        <Paper variant="light-bg-border" sx={{ width: "100%", p: "40px" }}>
          <Typography variant="h4">Login</Typography>
          <Typography component={"p"} variant="text-md-medium" sx={{ mt: 2 }}>
            Provide your credentials to get started
          </Typography>

          {/* Formik Form */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="text-sm-medium">Company Name</Typography>
              <Input
                disableUnderline
                fullWidth
                name="companyName"
                onChange={formik.handleChange}
                value={formik.values.companyName}
                placeholder="Enter company name"
                sx={{
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  border: "2px solid rgba(196, 196, 196, 0.6)",
                  mt: 0.5,
                }}
              />
              {formik.errors.companyName && formik.touched.companyName ? (
                <Typography color="error">
                  {formik.errors.companyName}
                </Typography>
              ) : null}
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="text-sm-medium">Email</Typography>
              <Input
                disableUnderline
                fullWidth
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter email"
                sx={{
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  border: "2px solid rgba(196, 196, 196, 0.6)",
                  mt: 0.5,
                }}
              />
              {formik.errors.email && formik.touched.email ? (
                <Typography color="error">{formik.errors.email}</Typography>
              ) : null}
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography variant="text-sm-medium">Password</Typography>
              <Input
                disableUnderline
                fullWidth
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Enter password"
                sx={{
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  border: "2px solid rgba(196, 196, 196, 0.6)",
                  mt: 0.5,
                }}
              />
              {formik.errors.password && formik.touched.password ? (
                <Typography color="error">{formik.errors.password}</Typography>
              ) : null}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <CheckBox
                // checked={formik.values.rememberMe}
                // onChange={formik.handleChange}
                // name="rememberMe"
                />
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
                  sx={{ cursor: "pointer" }}
                >
                  Forgot Password
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "100%", mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                label="Login"
                disabled={isLoading}
                onClick={handleButtonClick}
              />
            </Box>
          </form>
        </Paper>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
