"use client";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";

import { Paper } from "@/components/Paper";
import { AlertModal } from "@/modals/AlertModal";
import { palette } from "@/theme/Palette";
import { isPilotMode } from "@/utils/constants";
import { Box, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateAlertPage = () => {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCreateAlert = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else router.push("/alerts/feedback");
  };
  return (
    <Box
      sx={{
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-end",
      }}
    >
      <PageHeader title={`Create Alert for "Retriever 2"`} />

      {/* Input container */}
      <Box width={"100%"}>
        <Paper
          sx={{
            width: "100%",
            minHeight: "15rem",
            padding: "2rem",
            border: `2px solid ${palette.opacity.gray} !important`,
          }}
          variant="light-border"
        >
          <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
            <Typography variant="text-md-semibold">Alert Name 1</Typography>
            <Paper
              variant="light-border"
              sx={{
                minHeight: "5rem",
                padding: "0.5rem 1rem",
                display: "flex",
                maxHeight: "15rem",
                background: "transparent !important ",
                border: `2px solid ${palette.opacity.gray} !important`,
                borderRadius: "5px",
              }}
            >
              <Input
                multiline
                fullWidth
                disableUnderline
                placeholder="Type your data request (prompt) here..."
                sx={{
                  boxSizing: "border-box",
                  minHeight: "7rem",
                  alignItems: "flex-start",
                  overflowY: "auto",
                  padding: "0.5rem 0 ",
                }}
              />
            </Paper>
            <Typography
              variant="text-sm"
              sx={{
                marginLeft: "10px",
              }}
            >
              We’ll set up an alert for selected Retriever, “Retriever 2”.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Create Alert Button */}
      <Box width={180} mt={"2rem"}>
        <Button
          variant="outlined"
          label="Create Alert"
          fullWidth
          onClick={() => handleCreateAlert()}
        />
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default CreateAlertPage;
