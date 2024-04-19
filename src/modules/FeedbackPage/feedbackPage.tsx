"use client";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface FeedbackProps {
  type: "retriever" | "alert";
}

const FeedbackPage: FC<FeedbackProps> = ({ type }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: "calc(100vh - 130px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: 704,
          height: 516,
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
        type="light-border"
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1rem"}
        >
          <Image
            src={"/Images/success-logo.svg"}
            alt="success"
            width={120}
            height={120}
          />
          <Typography variant="display-xs-bold">Success</Typography>
          <Typography
            variant="text-lg-regular"
            sx={{
              textAlign: "center",
            }}
          >
            {type === "alert"
              ? "This retriever will alert you when sales go up by 30% in a given week. Your alert is now active."
              : "This retriever has created successfully. You can use this retriever from Retrievers List."}
          </Typography>
        </Box>
        {type === "alert" ? (
          <Box display={"flex"} gap={"1rem"} mt={"1rem"}>
            <Box width={280}>
              <Button
                fullWidth
                variant="outlined"
                label="Go to Alerts Log"
                onClick={() => router.push("/alerts")}
              />
            </Box>
            <Box width={280}>
              <Button
                fullWidth
                variant="contained"
                label="Go to Alerts Managment"
              />
            </Box>
          </Box>
        ) : (
          <Box width={280} height={44}>
            <Button
              variant="contained"
              label="Go to Retrievers"
              fullWidth
              onClick={() => router.push("/retrievers")}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FeedbackPage;
