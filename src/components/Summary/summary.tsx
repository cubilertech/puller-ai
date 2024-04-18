import { Typography } from "@mui/material";
import { Paper } from "../Paper";
import { FC } from "react";

interface Summary {
  heading: string;
  description: string;
}

let dummyData = {
  heading: "Summary",
  description:
    " This query first selects distinct customer IDs, email addresses, and last interaction timestamps from both the Segment and Lytics tables, and sums up the total transactions from both tables.Itthen filters the results based on membership in Wawas loyalty program and whether a purchase or redemption was made in the past week.Finally, it merges the two lists, deduplicating line items by Customer ID ",
};

const Summary: FC<Summary> = ({ heading, description }) => {
  return (
    <Paper
      type="light-border"
      sx={{
        maxWidth: "100%",
        wordBreak: "break-all",
        padding: "1rem",
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="text-md-semibold"> {heading} </Typography>
      <br />
      <Typography variant="text-sm-regular">{description}</Typography>
    </Paper>
  );
};

export default Summary;
