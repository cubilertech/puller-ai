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

// Validation schema for the form
const LoginSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
});

const SettingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      companyName: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      localStorage.setItem("companyName", values.companyName);
      router.push("/request");
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
  return (
    <Box p={"2%"} height={"100vh"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
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

            {/* Formik Form */}
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ mt: 2.4 }}>
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

              {/* <Box
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
                    // checked={}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    // icon={<CircleOutlined />}
                    checkedIcon={
                      // <Icon icon="roundCheckbox" width={18} height={18} />
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
              </Box> */}
              <Box sx={{ width: "100%", mt: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  label="Update"
                  disabled={isLoading}
                  onClick={handleButtonClick}
                />
              </Box>
              {/* <Box
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
              </Box> */}
              {/* <Box
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
              </Box> */}
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

export default SettingPage;
