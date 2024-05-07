import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { FC } from "react";

interface AlertModalProps {
  open: boolean;
  handleClose: () => void;
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "62vh",
  bgcolor: "transparnet",
  border: "none",
  boxShadow: 24,
  p: 0,
  borderRadius: "12px",
};

const AlertModal: FC<AlertModalProps> = ({ open, handleClose }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ background: "rgba(0,0,0,0.4)" }}
      >
        <Box sx={modalStyle}>
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
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "2%",
                right: "2%",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              <Close />
            </Box>
            <Box>
              <Box sx={{ width: "240px", height: "240px", m: "auto" }}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src="/alert-loader.gif"
                  alt="alert loader"
                />
              </Box>
              <Typography variant="display-xs-regular">
                This feature is not available in Private Beta.
              </Typography>
              <Box sx={{ width: 180, mt: 4, mx: "auto", mb: 5 }}>
                <Button variant="contained" label="Contact US" fullWidth />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default AlertModal;
