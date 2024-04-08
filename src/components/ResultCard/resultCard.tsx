import { FC } from "react";
import { Paper } from "../Paper";
import { Box, Typography } from "@mui/material";
import { CardData } from "@/utils/types";
import { IconButton } from "../IconButton";
import { Button } from "../Button";
import Divider from "../Divider/divider";

interface ResultCardProps {
  data: CardData;
}

const ResultCard: FC<ResultCardProps> = ({ data }) => {
  return (
    <>
      <Paper type="light-border" sx={{ padding: 3, height: "100%" }}>
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
            <Box width={"36px"}>
              <IconButton
                icon="importIcon"
                iconHeight={16}
                iconWidth={16}
                fullWidth
              />
            </Box>
            <Box width={"36px"}>
              <IconButton
                icon="eyeIcon"
                iconHeight={16}
                iconWidth={16}
                fullWidth
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 2, maxWidth: "568px" }}>
          <Typography variant="text-md-regular">
            {data.main_discription}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 5,
            alignItems: "start",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">File Type:</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">File Size:</Typography>
            <Typography variant="text-sm-semibold">{data.fileSize}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">File Structured:</Typography>
            <Typography variant="text-sm-semibold">
              {data.fileStructured}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">File Timestamps:</Typography>
            <Typography variant="text-sm-semibold">
              {data.fileTimestamps}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">File Caveats:</Typography>
            <Typography variant="text-sm-semibold">
              {data.fileCaveats}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="text-sm-regular">Sources:</Typography>
            <Typography variant="text-sm-semibold">{data.sources}</Typography>
          </Box>
        </Box>
        <Box py={2}>
          <Divider variant="fullWidth" type="dark" />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="text-md-semibold">{data.title}</Typography>
          <Typography variant="text-sm-regular">{data.discription}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "end",
            justifyContent: "end",
            width: "100%",
            height: "32%",
          }}
        >
          <Box py={2}>
            <Divider variant="fullWidth" type="dark" />
          </Box>
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
              />
            </Box>
            <Box width={"242px"}>
              <Button
                label="Advanced Actions"
                fullWidth
                size="large"
                variant="contained"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
export default ResultCard;
