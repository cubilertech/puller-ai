"use client";
import { Button } from "@/components/Button";
import { Paper } from "@/components/Paper";
import { FeedbackPageVariants } from "@/utils/types";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface FeedbackProps {
  variant: FeedbackPageVariants;
}

const FeedbackPage: FC<FeedbackProps> = ({ variant }) => {
  const router = useRouter();
  const isLg = useMediaQuery("(max-width:1500px)");

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="fade-in"
    >
      <Paper
        sx={{
          height: { xl: "516px", lg: "350px", md: "216px" },
          width: { xl: "704px", lg: "504px", md: "403px" },
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="light-border"
      >
        {/* Success logo and message */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1rem"}
        >
          <Image
            src={"/Images/success-logo.svg"}
            alt="success"
            width={isLg ? 80 : 120}
            height={isLg ? 80 : 120}
          />
          <Typography variant={isLg ? "text-lg-bold" : "display-xs-bold"}>
            Success
          </Typography>
          <Typography
            variant={isLg ? "text-sm-regular" : "text-lg-regular"}
            sx={{
              textAlign: "center",
            }}
          >
            {variant === "alert"
              ? "This retriever will alert you when sales go up by 30% in a given week. Your alert is now active."
              : "This retriever has created successfully. You can use this retriever from Retrievers List."}
          </Typography>
        </Box>

        {/* Alert Success Buttons */}
        {variant === "alert" ? (
          <Box display={"flex"} gap={"1rem"} mt={"1rem"}>
            <Box width={{ xl: "280px", lg: "150px" }}>
              <Button
                fullWidth
                variant="outlined"
                label="Go to Alerts Log"
                onClick={() => router.push("/alerts")}
              />
            </Box>
            <Box width={{ xl: "280px", lg: "150px" }}>
              <Button
                fullWidth
                variant="contained"
                label="Go to Alerts Managment"
              />
            </Box>
          </Box>
        ) : (
          // Retriever Success Button
          <Box width={{ xl: "280px", lg: "180px" }} height={44}>
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
