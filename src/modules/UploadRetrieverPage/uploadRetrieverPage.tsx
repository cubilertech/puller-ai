"use client";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import UploadCard from "@/components/UploadCard/uploadCard";
import { Box, Divider, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const data = [1, 2, 3];
const UploadRetrieverPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        padding: "2rem",
        height: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        scrollbarWidth: "none",
        overflowY: "none",
      }}
    >
      <PageHeader type="Custom Retrievers" />
      <Paper
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          scrollbarWidth: "none",
          minHeight: "25rem",
          height: isOpen ? "calc(100vh - 230px)" : "calc(100vh - 400px)",
        }}
        type="light-border"
      >
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
              borderRadius: "10px",
              padding: "0.5rem 1rem",
              border: "2px solid rgba(196, 196, 196, 0.6)",
            }}
          />
        </Box>

        <Box
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            border: "2px solid rgba(196, 196, 196, 0.6)",
            minHeight: "10rem",
            height: "50%",
            borderRadius: "10px",
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
            sx={{
              backgroundColor: "rgb(215,215,215)",
              mt: "10px",
            }}
          />
        ) : (
          <Box
            display={"grid"}
            gridTemplateColumns={"1fr 1fr 1fr"}
            gap={"2rem"}
            mb={"2rem"}
          >
            {data.map((item, index) => (
              <Box
                display={"flex"}
                flexDirection={"column"}
                key={index}
                gap={"1rem"}
              >
                <UploadCard />
                <Input
                  disableUnderline
                  placeholder="Add additional context here"
                  sx={{
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                    borderRadius: "8px",
                    padding: "0.5rem",
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

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
              onClick={() => router.push("/retrievers/feedback")}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default UploadRetrieverPage;
