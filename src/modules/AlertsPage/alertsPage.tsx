"use client";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import AlertCard from "@/components/AlertCard/alertCard";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { ACTIVE_TYPES, ALERT_DATA, UNREAD_ALERT_DATA } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const AlertsPage = () => {
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.ALL);

  const notificationType =
    isActive === ACTIVE_TYPES.UNREAD ? UNREAD_ALERT_DATA : ALERT_DATA;
  return (
    <Box
      sx={{
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "100%",
      }}
    >
      <PageHeader type="Alerts" />

      {/* Table */}

      <Paper
        sx={{
          height: "90%",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "1rem",
        }}
        type="light-border"
      >
        {/* Table Topbar */}
        <Box
          sx={{
            width: "100%",
            minHeight: "2rem",
            background:
              "linear-gradient(142.96deg, rgba(255, 255, 255, 0.148) -3.54%, rgba(114, 114, 114, 0.168) 95.15%)",
            padding: "1rem 1rem 0",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "flex",
            gap: "1rem",
          }}
        >
          {/* Select All */}
          <Box
            onClick={() => setIsActive(ACTIVE_TYPES.ALL)}
            sx={{
              padding: " 0 1rem",
              borderBottom:
                isActive === ACTIVE_TYPES.ALL
                  ? "2px solid rgb(252,252,253)"
                  : "",
              ":hover": {
                cursor: "pointer",
              },
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

          {/* Select Unread */}
          <Box
            onClick={() => setIsActive(ACTIVE_TYPES.UNREAD)}
            sx={{
              borderBottom:
                isActive === ACTIVE_TYPES.UNREAD
                  ? "2px solid rgb(252,252,253)"
                  : "",
              ":hover": {
                cursor: "pointer",
              },
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

        {/* TableData */}
        <Box
          sx={{
            height: "90%",
            borderRadius: "16px",
            overflow: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {notificationType.map((notification, index) => (
            <AlertCard
              key={index}
              type={notification.type === "user" ? "user" : "option"}
              avatar={notification?.image}
              name={notification?.name}
              price={notification?.price}
              product={notification?.product}
              description={
                notification.description && notification?.description
              }
              time={notification.time}
              dataLength={ALERT_DATA.length}
              index={index}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default AlertsPage;
