"use client";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Box, DialogActions, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { FormValusContactForm } from "@/utils/types";
import { sendEmail } from "@/utils/send-email";
import { toastTimeout } from "@/utils/constants";
import "react-toastify/dist/ReactToastify.css";

const ContactUSP = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string()
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
  const initialValues: FormValusContactForm = {
    name: "",
    email: "",
    message: "",
  };

  // Handle form submission
  const handleSubmit = async (
    values: FormValusContactForm,
    { resetForm }: FormikHelpers<FormValusContactForm>
  ) => {
    try {
      await sendEmail(values);
      resetForm();
      toast.success("Message sent successfully!");
      router.back();
    } catch (error) {
      console.error("Error sending message:", error);
      // toast.error("Failed to send message. Please try again.");
    }
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
      <ToastContainer
        position="top-right"
        autoClose={toastTimeout}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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

        {/* <Typography mt={1}>
          Please fill out the form with your details, and a member of our team
          will get back to you as soon as possible.
        </Typography> */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box mt={3}>
                <Box>
                  <Typography variant="text-xs-medium">Full Name</Typography>
                  <Field
                    as={TextField}
                    placeholder="Enter Full name"
                    name="name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="text-xs-medium">Email</Typography>
                  <Field
                    as={TextField}
                    placeholder="Enter Email"
                    name="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="text-xs-medium">Message</Typography>
                  <Field
                    as={TextField}
                    name="message"
                    placeholder="Enter your message"
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
                  size="large"
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
