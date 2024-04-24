"use client";

import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
// import "./Input.css";
import Image from "next/image";
import Input from "@/components/Input/input";

const data = Array.from({ length: 10 }, (_, index) => ({
  image: "/images/blank-square.svg",
  heading: `Template ${index + 1}`,
  subHeading: `Maker by User ${index + 1}`,
  subHeading2: `Retrievers ${index + 1} bot will help to geth...`,
}));
const data1 = Array.from({ length: 10 }, (_, index) => ({
  image: "/images/blank-square.svg",
  heading: `Template 2 ${index + 1}`,
  subHeading: `Maker by User 2${index + 1}`,
  subHeading2: `Retrievers 2${index + 1} bot will help to geth...`,
}));

const TemplatePage = () => {
  const [isActive, setIsActive] = useState("public");

  return (
    <Box display={"flex"} flexDirection={"column"} px={"1rem"} pt={"0.6rem"}>
      <PageHeader type="Template" />
      <Box
        sx={{
          mt: "2rem",
          flexGrow: "1",
        }}
      >
        <Paper
          sx={{
            padding: "1.5rem",
            height: "calc(100vh - 220px)",
            paddingBottom: "1rem",
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
          type="light-border"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              mb: "2rem",
              height: "5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                onClick={() => setIsActive("public")}
                sx={{
                  borderBottom:
                    isActive === "public"
                      ? "1px solid rgb(0,224,238)"
                      : "1px solid rgb(114,121,129)",

                  width: "202px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  pb: "5px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="text-md-regular">Public</Typography>
              </Box>

              <Box
                onClick={() => setIsActive("private")}
                sx={{
                  borderBottom:
                    isActive === "private"
                      ? "1px solid rgb(0,224,238)"
                      : "1px solid rgb(114,121,129)",
                  textAlign: "center",
                  width: "202px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  pb: "5px",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="text-md-regular">Private</Typography>
              </Box>
            </Box>

            <Input
              placeholder="Search..."
              icon="search"
              width={230}
              height={40}
            />
          </Box>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "94%",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
          >
            {(isActive === "private" ? data : data1).map((card, i) => (
              <Box key={i} mt={i === 0 ? "" :"1.5rem"} sx={{}}>
                <Paper
                  type="light-border"
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    border: 0,
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1rem"}
                    borderRadius={"8px"}
                  >
                    <Image src={card.image} alt="pic" width={64} height={64} />
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography variant="text-md-regular">
                        {card.heading}
                      </Typography>
                      <Typography variant="text-xs-regular">
                        {card.subHeading}
                      </Typography>
                      <Typography variant="text-xs-regular">
                        {card.subHeading2}
                      </Typography>
                    </Box>
                  </Box>
                  <Icon icon="actions" width={42} height={24} />
                </Paper>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
