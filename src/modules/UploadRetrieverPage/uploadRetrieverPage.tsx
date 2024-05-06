"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";

import { Paper } from "@/components/Paper";
import { UploadBox } from "@/components/UplaodBox";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { Box, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadRetrieverPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        pb: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        scrollbarWidth: "none",
        overflowY: "none",
      }}
    >
      <PageHeader title="Custom Retrievers" />

      {/* Main Container */}
      <Box
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          width: "100%",
          height: "100%",
        }}
      >
        <Paper
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            minHeight: "25rem",
            height: "fit-content",
          }}
          variant="light-border"
        >
          {/* Name Label & Input */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={"0.5rem"}
          >
            <Typography variant="text-sm-medium">Name</Typography>
            <Input
              disableUnderline
              fullWidth
              placeholder="Enter Name"
              sx={{
                borderRadius: "8px",
                padding: "0.5rem 1rem",
                border: "2px solid rgba(196, 196, 196, 0.6)",
              }}
            />
          </Box>

          {/* Uplaod Area */}
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              border: "2px solid rgba(196, 196, 196, 0.6)",
              minHeight: "10rem",
              height: "50%",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Icon icon="cloudUpload" width={40} height={40} />
            <Typography variant="text-sm-medium">
              <Typography variant="text-sm-bold">Click to upload</Typography> or
              drag and drop
            </Typography>
          </Box>

          {!isOpen ? (
            <Divider
              type="light"
              sx={{
                backgroundColor: "rgb(215,215,215)",
                mt: "10px",
              }}
            />
          ) : (
            // Upload Cards & Inputs
            <UploadBox />
          )}

          {/* Back & Create Buttons */}
          <Box display={"flex"} justifyContent={"flex-end"} gap={"1rem"}>
            <Box width={242} height={44}>
              <Button
                label="Go Back"
                variant="outlined"
                fullWidth
                onClick={() => router.back()}
              />
            </Box>
            <Box width={242} height={44}>
              <Button
                label="Create Retriever"
                variant="contained"
                fullWidth
                onClick={
                  CURRENT_MODE === MODES.DEMO
                    ? () => router.push("/retrievers/feedback")
                    : () => alert("No acess")
                }
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UploadRetrieverPage;
