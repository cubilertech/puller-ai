"use client";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Icon } from "@/components/Icon";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { UploadBox } from "@/components/UplaodBox";
import { useCreateRetriever } from "@/hooks/useRetriever";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { StatusTypes } from "@/utils/types";
import { Box, Input, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FeedbackPage from "../FeedbackPage/feedbackPage";
import { toast } from "react-toastify";

const UploadRetrieverPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    mutate: CreateRetriever,
    isSuccess: RetrieverCreatedSuccess,
    isLoading: CreatingRetriever,
  } = useCreateRetriever();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setDescription(event.target.value);
    }
  };

  const handleNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setName(event.target.value);
    }
  };

  const handleUploadDocs = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const handleCreateRetriever = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      if (name === "") {
        toast.warning("Please Enter Name.");
      } else if (selectedFiles.length === 0) {
        toast.warning("Please Upload Files.");
      } else if (name && selectedFiles.length > 0) {
        // CreateRetriever({
        //   status: StatusTypes.needPermissions,
        //   description: description,
        //   images: selectedFiles,
        //   title: name,
        // });
        console.log(selectedFiles, "selectedFiles");
      }
    }
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedFiles, RetrieverCreatedSuccess]);

  return (
    <>
      {RetrieverCreatedSuccess ? (
        <FeedbackPage variant="retriever" />
      ) : CreatingRetriever ? (
        <Loader variant="pageLoader" type="Processing" />
      ) : (
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
                  onChange={handleNameInput}
                  placeholder="Enter Name"
                  sx={{
                    borderRadius: "5px",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(196, 196, 196, 0.6)",
                  }}
                />
              </Box>

              {/* Upload Area */}
              <Box
                onClick={handleUploadDocs}
                sx={{
                  border: "2px solid rgba(196, 196, 196, 0.6)",
                  minHeight: "10rem",
                  height: "50%",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  multiple
                />
                <Icon icon="cloudUpload" width={40} height={40} />
                <Typography variant="text-sm-medium">
                  <Typography variant="text-sm-bold">
                    Click to upload
                  </Typography>{" "}
                  or drag and drop
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
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    overflowX: "auto",
                    scrollbarWidth: "none",
                    mb: 8,
                  }}
                >
                  {selectedFiles.map((file, index) => (
                    <UploadBox
                      key={index}
                      name={file.name}
                      size={file.size}
                      inputValue={description}
                      handleChangeInput={handleDescriptionInput}
                    />
                  ))}
                </Box>
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
                    onClick={handleCreateRetriever}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
          <AlertModal
            handleClose={() => setIsOpenAlert(false)}
            open={isOpenAlert}
          />
        </Box>
      )}
    </>
  );
};

export default UploadRetrieverPage;
