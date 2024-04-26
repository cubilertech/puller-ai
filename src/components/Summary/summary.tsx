import { Typography } from "@mui/material";
import { Paper } from "../Paper";
import { FC } from "react";

interface Summary {
  heading: string;
  description: string;
}

const Summary: FC<Summary> = ({ heading, description }) => {
  return (
    <Paper
      type="light-border"
      sx={{
        maxWidth: "100%",
        wordWrap: "break-word",
        padding: "2rem",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="text-md-semibold"> {heading} </Typography>
      <br />
      <Typography variant="text-xxs-regular">{description}</Typography>
    </Paper>
  );
};

export default Summary;
