import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { palette } from "@/theme/Palette";
import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  borderRadius: "10px",
};

const AlertModal: FC<AlertModalProps> = ({ open, handleClose }) => {
  const router = useRouter();
  const handleContact = () => {
    router.push(`/contact-us`);
  };

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
              <Close sx={{ color: palette.base.white }} />
            </Box>
            <Box>
              <Box sx={{ width: "240px", height: "240px", m: "auto" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={"/Images/alert-loader.gif"}
                  alt="alert loader"
                  width={240}
                  height={240}
                />
              </Box>
              <Typography
                component={"p"}
                variant="display-xs-regular"
                color={palette.base.white}
              >
                This feature is not available in Private Beta.
              </Typography>
              <Box sx={{ width: 180, mt: 4, mx: "auto", mb: 5 }}>
                <Button
                  variant="contained"
                  label="Contact Us"
                  fullWidth
                  onClick={handleContact}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default AlertModal;
