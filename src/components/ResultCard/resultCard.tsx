"use client";
import { FC, useState } from "react";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
import { CardData } from "@/utils/types";
import { IconButton } from "../IconButton";
import { Button } from "../Button";
import Divider from "../Divider/divider";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import { CustomLink } from "../Link";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";

interface ResultCardProps {
  data: CardData;
}

const ResultCard: FC<ResultCardProps> = ({ data }) => {
  const route = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleOpen = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else route.push("/request/recent");
  };
  const handleAdvanced = () => {
    route.push("/advanced");
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data?.fileLink;
    link.download = "download.txt";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const router = useRouter();
  return (
    <Box width={"80%"} height={"100%"}>
      <Paper
        variant="light-border"
        sx={{
          padding: 3,
          height: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            height: "calc(100vh - 300px)",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="text-xl-bold" width={"fit-contant"}>
              {data.main_title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box width={"36px"} onClick={() => handleOpen()}>
                <IconButton
                  icon="importIcon"
                  iconHeight={16}
                  iconWidth={16}
                  fullWidth
                />
              </Box>

              <Box width={"36px"} onClick={() => handleDownload()}>
                <IconButton
                  icon="eyeIcon"
                  iconHeight={16}
                  iconWidth={16}
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
          {/* Description */}
          <Box sx={{ maxWidth: "568px" }}>
            <Typography variant="text-md-regular">
              {data.main_discription}
            </Typography>
          </Box>
          {/* File info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              mt: 2,
              alignItems: "start",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, mb: -0.6 }}>
              <Typography variant="text-sm-regular">File Type:</Typography>
              <CustomButton variant="smallbutton" text="CSV" />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">File Size:</Typography>
              <Typography variant="text-sm-semibold">
                {data.fileSize}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">
                File Structured:
              </Typography>
              <Typography variant="text-sm-semibold">
                {data.fileStructured}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">
                File Timestamps:
              </Typography>
              <Typography variant="text-sm-semibold">
                {data.fileTimestamps}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">File Caveats:</Typography>
              <Typography variant="text-sm-semibold">
                {data.fileCaveats}{" "}
                <CustomLink href="/" variant="border">
                  See More
                </CustomLink>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">Sources:</Typography>
              <Typography variant="text-sm-semibold">{data.sources}</Typography>
            </Box>
          </Box>
          {/* Divider */}
          <Box py={2}>
            <Divider variant="fullWidth" type="dark" />
          </Box>
          {/* Observations */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="text-md-semibold">{data.title}</Typography>
            <Typography variant="text-sm-regular">
              {data.discription}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "end",
            justifyContent: "end",
            width: "100%",
            height: "20%",
          }}
        >
          {/* Divider */}
          <Box pb={2} pt={"6%"}>
            <Divider variant="fullWidth" type="dark" />
          </Box>
          {/*Download & Advanced Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              pt: 2,
            }}
          >
            <Box width={"242px"}>
              <Button
                label="Download Package"
                fullWidth
                size="large"
                variant="outlined"
                onClick={handleOpen}
              />
            </Box>
            <Box width={"242px"}>
              <Button
                label="Advanced Actions"
                fullWidth
                size="large"
                variant="contained"
                onClick={handleAdvanced}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};
export default ResultCard;
