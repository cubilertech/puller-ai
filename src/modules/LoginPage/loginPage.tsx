"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Logo } from "@/components/logo";
import { palette } from "@/theme/Palette";
import { CheckBox, CircleOutlined } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  CircularProgress,
  Input,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Divider } from "@/components/Divider";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import { CustomLink } from "@/components/Link";
import { useSubmitLogin } from "@/hooks/useLogin";
import { updateUserName } from "@/libs/redux/features/validateRequest";
import { useDispatch } from "react-redux";
import { isPilotMode } from "@/utils/constants";

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  // companyName: Yup.string().required("Company Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().max(32).min(3).required("username is required"),
  password: Yup.string().max(24).min(3).required("Password is required"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { mutate, isSuccess, isError, data } = useSubmitLogin();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      // companyName: "",
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // localStorage.setItem("companyName", values.companyName);
      dispatch(updateUserName(values.username));
      localStorage.setItem("companyName", "Puller AI");
      if (isPilotMode) {
        mutate({ username: values.username, password: values.password });
      } else {
        router.push("/request");
      }

      // localStorage.setItem("companyName", "Puller AI");
      //
      setIsLoading(true);
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
    if ((isSuccess && data) || isError) {
      setIsLoading(false);
    }
  }, [isSuccess, isError, data]);

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
        {/* login side */}
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
            <Typography variant="h4">Login</Typography>
            <Typography component={"p"} variant="text-md-medium" sx={{ mt: 2 }}>
              Provide your credentials to get started
            </Typography>
            {isError && (
              <Box
                sx={{
                  width: "100%",
                  borderBorder: `2px solid ${palette.error[900]}`,
                  background: palette.error[200],
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  mt: 1,
                }}
              >
                <Typography
                  color={palette.error[600]}
                  component={"p"}
                  variant="text-sm-regular"
                >
                  Please enter valid Username or password
                </Typography>
              </Box>
            )}
            {/* Formik Form */}
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
                  <Typography color="error">
                    {formik.errors.password}
                  </Typography>
                ) : null}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  mt: 2.8,
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <Checkbox
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    checkedIcon={
                      <Icon icon="squareCheckbox" width={18} height={18} />
                    }
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
              <Box sx={{ width: "100%", mt: 2, position: "relative" }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  label="Login"
                  disabled={isLoading}
                  onClick={handleButtonClick}
                />
                {isLoading && (
                  <CircularProgress
                    sx={{
                      position: "absolute",
                      color: palette.base.white,
                      top: 12,
                      zIndex: 4,
                      left: "47%",
                    }}
                    size={24}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  width: "100%",
                  mt: 3.5,
                  mb: 2.8,
                }}
              >
                <Box
                  sx={{ width: "100%", background: "#DCE4E8", height: "1px" }}
                ></Box>
                <Typography sx={{ mt: -0.5, color: palette.color.gray[750] }}>
                  or
                </Typography>{" "}
                <Box
                  sx={{ width: "100%", background: "#DCE4E8", height: "1px" }}
                ></Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <CustomButton variant="google-login" text="Login with Google" />
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
        {/* image logo side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "centers",
            width: "60%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xl: "80px", lg: "120px", md: "140px" },
              transform: "scale(180%)",
              opacity: 0.1,
            }}
          >
            <Icon icon="logoIcon" width={1000} />
          </Box>
          <Paper
            variant="light-border"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
              backdropFilter: "blur(0px)",
            }}
          >
            <Icon icon="logo" width={500} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
