"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Logo } from "@/components/logo";
import { palette } from "@/theme/Palette";
import { Box, Checkbox, Input, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CustomLink } from "@/components/Link";
import { useSubmitNewPassword } from "@/hooks/useLogin";
import { useSelector } from "react-redux";
import { getUserName } from "@/libs/redux/features/validateRequest";

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{7,}$/,
      "New password must contain at least one special character, one number, and be greater than 6 characters"
    ),
  password: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Password is required"),
});

const EnterPassowrd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UserName = useSelector(getUserName);
  const { mutate, isSuccess } = useSubmitNewPassword();
  const formik = useFormik({
    initialValues: {
      // companyName: "",
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

  const handleButtonClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    if (isSuccess) {
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
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  placeholder="Enter New Password"
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
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter Confirm password"
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

export default EnterPassowrd;
