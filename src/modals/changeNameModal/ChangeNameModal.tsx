import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { FC } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { palette } from "@/theme/Palette";
import { ConnectItem } from "@/utils/types";
import { Paper } from "@/components/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "",
  boxShadow: 24,
  BorderRadius: 2,
  border: "none",
};

interface ChangeNameModalProps {
  open: boolean;
  handleClose: () => void;
  isLoading: boolean;
  SelectedData: ConnectItem;
  updateData: (data: any) => void;
}

const ChangeNameModal: FC<ChangeNameModalProps> = ({
  open,
  handleClose,
  isLoading,
  SelectedData,
  updateData,
}) => {
  const formik = useFormik({
    initialValues: {
      id: SelectedData?.id || "",
      name: SelectedData?.name || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      updateData({ id: values.id, name: values.name });
      // if (isSuccess) {
        handleClose();
      // }
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Paper
          variant="light-border"
          sx={{
            width: "100%",
            height: "100%",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            padding: 4,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="display-xs-semibold">Edit Name</Typography>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled={isLoading}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Box
              sx={{ position: "relative", mt: 2 }}
              className={isLoading ? "looping-opacity" : "opacity-out"}
            >
              <Button
                variant="contained"
                label="Submit"
                disabled={
                  isLoading || formik.values.name === SelectedData?.name
                }
                fullWidth
                onClick={() => formik.submitForm()}
              />
              {isLoading && (
                <CircularProgress
                  sx={{
                    color: palette.base.white,
                    position: "absolute",
                    top: 5.4,
                    zIndex: 5,
                    left: 38,
                  }}
                  size={24}
                />
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ChangeNameModal;
