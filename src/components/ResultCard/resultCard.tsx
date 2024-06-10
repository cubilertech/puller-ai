"use client";
import { FC, useMemo, useState } from "react";
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
import { replaceBrandName } from "@/utils/common";

interface ResultCardProps {
  data: CardData;
}

//  const overflowText = {
//   overflow: "hidden",
//   display: "-webkit-box",
//   WebkitLineClamp: 2,
//   WebkitBoxOrient: "vertical",
// };
const ResultCard: FC<ResultCardProps> = ({ data }) => {
  const route = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  // const [isOpendiscription, setIsOpendiscription] = useState(false);

  const handleOpen = (id: string) => {
    const withoutquery = id?.replace("query#", "");
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else route.push(`/request/preview/${withoutquery}`);
  };
  const handleAdvanced = () => {
    route.push("/advanced");
  };
  const handleDownload = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else route.push(data.fileLink as string);
  };
  const handleDownloadGoogle = () => {
    if(isPilotMode){
       const url = data.fileLink as string;
       const anchor = document.createElement('a');
       anchor.href = url;
       anchor.target = '_blank'; // Open in a new tab
       document.body.appendChild(anchor);
       anchor.click();
       // Remove the anchor from the document
       document.body.removeChild(anchor);
    }
  }
  const companyName = localStorage.getItem("companyName");

  const description = useMemo(() => {
    return replaceBrandName({ description: data?.main_description as string }, companyName as string);
    // return replaceIdWithVariableInDiscription(data as Prompt);
  }, [data]);
  const observations = useMemo(() => {
    return replaceBrandName({ description: data?.observations as string }, companyName as string);
    // return replaceIdWithVariableInDiscription(data as Prompt);
  }, [data]);

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
              <Box width={"36px"} onClick={() => handleOpen(data?.id)}>
                <IconButton
                  icon="importIcon"
                  iconHeight={16}
                  iconWidth={16}
                  fullWidth
                />
              </Box>

              <Box width={"36px"} onClick={() => handleDownloadGoogle()}>
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
            <Typography
              variant="text-md-regular"
              // sx={isOpendiscription ? {} : overflowText}
            >
              {description}
            </Typography>
            {/* <span
              onClick={() => setIsOpendiscription(!isOpendiscription)}
              style={{ color: palette.primary.light, cursor: "pointer" }}
            >
              {" "}
              {isOpendiscription ? "See less" : "See more"}
            </span> */}
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
                {/* {typeof data.fileSize === "number"
                  ? (data.fileSize / 1024 / 1024).toFixed(0)
                  : "24"} */}
                {data.fileSize} KB
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
                <CustomLink href="#" variant="border">
                  See More
                </CustomLink>
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="text-sm-regular">Sources:</Typography>
              <Typography variant="text-sm-semibold">{data.sources}</Typography>
            </Box> */}
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
              {observations}
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
            height: "15%",
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
                onClick={() => handleDownload()}
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
