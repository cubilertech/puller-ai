"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";
import { FC } from "react";
import { useRouter } from "next/navigation";

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
        },
      }}
    >
      <Paper
        type="light-border"
        sx={{
          padding: "1.5rem",
          width: "100%",
          textAlign: "center",
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
          <Box position={"relative"}>
            <Icon icon={icon} width={64} height={64} />
            <Box position={"absolute"} top={"-3px"} right={"-3px"}>
              <Icon icon={status} width={12} height={12} />
            </Box>
          </Box>

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
