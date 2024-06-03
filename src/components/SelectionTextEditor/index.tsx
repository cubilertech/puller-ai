"use client";
import { Box, Input, Typography } from "@mui/material";
import { FC } from "react";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { CircleOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { palette } from "@/theme/Palette";
import { Divider } from "../Divider";
// import "./optionsBar.css";

interface Props {
  close: () => void;
  setText: (text: string) => void;
  text: string;
  handleSubmit: () => void;
}

const SelectionTextEditor: FC<Props> = ({ close, setText, text, handleSubmit }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        ml: "1rem",
        overflow: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Paper
        variant="light-border"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          height: "98.8%",
          justifyContent: "space-between",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography color={palette.base.white} variant="text-md-regular">
              Edit
            </Typography>
            <Box onClick={close}>
              <CloseIcon
                sx={{
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
          </Box>
          <Typography color={palette.base.white} variant="text-sm-regular">
            Enter updated value
          </Typography>

          <Paper
            variant="dark-border"
            sx={{
              minHeight: "10rem",
              padding: "0.5rem 1rem",
              display: "flex",
              maxHeight: "15rem",
              margin: 0,
              border: `2px solid ${palette.opacity.darkerGray}`,
            }}
          >
            <Input
              onChange={(e) => setText(e.target.value)}
              sx={{
                boxSizing: "border-box",
                minHeight: "100%",
                alignItems: "flex-start",
                overflowY: "auto",
              }}
              value={text}
              multiline
              fullWidth
              disableUnderline
              autoFocus
            />
          </Paper>
        </Box>

        <Box>
          <Divider type="light" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: "1rem",
            }}
          >
            <Button
              onClick={handleSubmit}
              sx={{ height: "38px !important" }}
              label="Update"
              variant="contained"
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SelectionTextEditor;
