"use client";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import AlertCard from "@/components/AlertCard/alertCard";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";

const data = [
  {
    image: "/Images/avatar-1.svg",
    name: "James Eusobio",
    product: "Blue Jeans Polos Slim Fit ",
    price: 199.0,
    time: "23 mins ago",
    type: "user",
  },
  {
    image: "/Images/avatar-2.svg",
    name: "Darcel Ballentine",
    product: "Pattern Top with Knot ",
    price: 210.98,
    time: "30 mins ago",
    type: "user",
  },
  {
    image: "/Images/avatar-2.svg",
    name: "Darcel Ballentine",
    product: "Pattern Top with Knot ",
    price: 210.98,
    time: "30 mins ago",
    type: "user",
  },
  {
    image: "/Images/avatar-2.svg",
    product: "Pattern Top with Knot ",
    name: "Darcel Ballentine",
    price: 210.98,
    time: "30 mins ago",
    type: "user",
  },
  {
    image: "/Images/avatar-2.svg",
    product: "Pattern Top with Knot ",
    name: "Darcel Ballentine",
    price: 210.98,
    time: "30 mins ago",
    type: "user",
  },
  {
    image: "/Images/avatar-3.svg",
    description: "Personalize your comunication with Customer Segmentation",
    time: "April 25",
  },
];

const AlertsPage = () => {
  const [isActive, setIsActive] = useState("all");
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "calc(100vh - 130px)",
      }}
    >
      <PageHeader type="Alerts" />

      <Paper
        sx={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "1rem",
        }}
        type="light-border"
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "2rem",
            // bgcolor: "rgb(61,75,84)",
            background:
              "linear-gradient(142.96deg, rgba(255, 255, 255, 0.148) -3.54%, rgba(114, 114, 114, 0.168) 95.15%)",

            padding: "1rem 1rem 0",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box
            onClick={() => setIsActive("all")}
            sx={{
              // width: "30px",
              padding: " 0 1rem",
              // bgcolor: "red",
              borderBottom:
                isActive === "all" ? "2px solid rgb(252,252,253)" : "",
            }}
          >
            <Typography
              variant="text-sm-semibold"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingBottom: "1rem",
              }}
            >
              All
              <CustomButton variant="round" text="2" />{" "}
            </Typography>
          </Box>

          <Box
            onClick={() => setIsActive("unread")}
            sx={{
              borderBottom:
                isActive === "unread" ? "2px solid rgb(252,252,253)" : "",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingBottom: "1rem",
              }}
              variant="text-sm-semibold"
            >
              Unread <CustomButton variant="round" text="4" />{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            overflowY: "scroll",
            height: "90%",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            "-ms-overflow-style": "none",
          }}
        >
          {data.map((notification, index) => (
            <AlertCard
              key={index}
              type={notification.type === "user" ? "user" : "option"}
              avatar={notification?.image}
              name={notification?.name}
              price={notification?.price}
              product={notification?.product}
              description={notification?.description}
              time={notification.time}
              dataLength={data.length}
              index={index}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default AlertsPage;
