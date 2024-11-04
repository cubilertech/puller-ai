"use client";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Box, DialogActions, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  email: string;
  message: string;
}

const ContactUSP = () => {
  const router = useRouter();

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  // Initial form values
  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  // Handle form submission
  const handleSubmit = (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log("Form submitted:", values);
    // Perform any actions here, like sending data to an API
    resetForm();
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        variant="light-border"
        sx={{ borderRadius: 2, p: 3, width: "500px" }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <KeyboardArrowLeftRounded
            sx={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => router.back()}
          />
          <Typography variant="display-xs-medium">Contact Us</Typography>
        </Box>

        <Typography mt={1}>
          Please fill out the form with your details, and a member of our team
          will get back to you as soon as possible.{" "}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box mt={3}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Field
                    as={TextField}
                    name="fullName"
                    label="First Name"
                    fullWidth
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    as={TextField}
                    name="message"
                    label="Message"
                    fullWidth
                    multiline
                    rows={4}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                  />
                </Box>
              </Box>

              <DialogActions sx={{ mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  label="Submit"
                  disabled={isSubmitting}
                />
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default ContactUSP;
