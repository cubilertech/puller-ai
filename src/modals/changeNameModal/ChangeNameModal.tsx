import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { Button } from "@/components/Button";
import { palette } from "@/theme/Palette";
import { ConnectItem } from "@/utils/types";
import { Paper } from "@/components/Paper";
import { useUpdateAppName } from "@/hooks/useRetriever";
import { Close } from "@mui/icons-material";

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
  SelectedData: ConnectItem;
  // refetch: () => void;
  setData: Dispatch<SetStateAction<ConnectItem[] | null | undefined>>;
}

const ChangeNameModal: FC<ChangeNameModalProps> = ({
  open,
  handleClose,
  SelectedData,
  // refetch,
  setData,
}) => {
  const {
    data: UpdatedNameData,
    mutate: updateAppName,
    isSuccess,
    isLoading,
  } = useUpdateAppName();
  const formik = useFormik({
    initialValues: {
      id: SelectedData?.id || "",
      name: SelectedData?.name || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateAppName({ id: values.id, name: values.name });
    },
  });

  useEffect(() => {
    if (isSuccess && UpdatedNameData) {
      handleClose();
      setData(UpdatedNameData);
    }
  }, [isSuccess, UpdatedNameData]);

  return (
    <Modal
      // autoFocus
      disableAutoFocus
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
            pt: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                pb: 2,
              }}
            >
              <Typography variant="display-xs-semibold">
                Edit App Name
              </Typography>
              <Close
                sx={{ width: "20px", height: "20px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Box>
            <TextField
              name="name"
              placeholder="App Name"
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
                label="Update"
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
                    left: "46%",
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
