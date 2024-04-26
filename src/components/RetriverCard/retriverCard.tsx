"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";
import { FC } from "react";
import { useRouter } from "next/navigation";
import "./retrieverCard.css";

interface retriverCardProps {
  status: "live" | "blocked" | "needPermissions" | "issues";
  icon:
    | "snowflake"
    | "segment"
    | "lytics"
    | "dataRoom"
    | "dbtCore"
    | "sfCrm"
    | "clReport"
    | "nielsen"
    | "googleAnalytics"
    | "clickstream";
  title: string;
  description: string;
}

const RetriverCard: FC<retriverCardProps> = ({
  description,
  icon,
  status,
  title,
}) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        ":hover": {
          cursor: "pointer",
          backgroundColor: "rgb(47,61,92)",
        },
      }}
    >
      <Paper
        type="light-border"
        sx={{
          backgroundColor: "transparent",
          padding: "1.5rem",
          width: "100%",
          textAlign: "center",
          ":hover": {
            cursor: "pointer",
            background:
              "linear-gradient(142.96deg, rgba(93, 146, 254, 0.148) -3.54%, rgba(93, 146, 254, 0.168) 95.15%)",
            "& .child": {
              background: "rgba(93, 146, 254, 0.3)",
            },
          },
        }}
        onClick={() => router.push("/alerts/retriever-detail")}
      >
        {/* Content Container */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          alignItems={"center"}
        >
          {/* Icon Box */}
          <div className="retriever-card-container">
            <Box position={"relative"}>
              <Box
                sx={{
                  background: "rgb(112,112,129)",
                  width: 60,
                  height: 60,
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "none",
                  ":hover": {
                    background: "rgba(93, 146, 254, 0.3)",
                  },
                }}
                className="child"
              >
                <Icon icon={icon} height={30} width={30} />
              </Box>
              <Box position={"absolute"} top={"-3px"} right={"-3px"}>
                <Icon icon={status} width={12} height={12} />
              </Box>
            </Box>
          </div>

          {/* Title & description */}
          <Typography variant="text-md-semibold">
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </Typography>
          <Typography variant="text-sm">{description}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RetriverCard;
