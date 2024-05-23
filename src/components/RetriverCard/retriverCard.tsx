"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { RetrieverIconsTypes, StatusTypes } from "@/utils/types";
import "./retrieverCard.css";
import { palette } from "@/theme/Palette";

interface retriverCardProps {
  status: StatusTypes;
  icon: RetrieverIconsTypes;
  title: string;
  description: string;
  onClick?: () => void;
}

const RetriverCard: FC<retriverCardProps> = ({
  description,
  icon,
  status,
  title,
  onClick,
}) => {
  return (
    <Box
      sx={{
        width: "210px",
        height: "226px",
        overflow: "hidden",
        ":hover": {
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: palette.color.blue,
        },
      }}
      onClick={onClick}
    >
      <Paper
        variant="light-border"
        sx={{
          backgroundColor: "transparent",
          padding: "1.5rem",
          width: "100%",
          height: "100%",
          textAlign: "center",
          ":hover": {
            cursor: "pointer",
            background: palette.linearGradient.darkBlue,
            "& .child": {
              background: palette.color.lightblue,
            },
          },
        }}
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
                  background: palette.color.gray[500],
                  width: 60,
                  height: 60,
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "none",
                  ":hover": {
                    background: palette.opacity.blue,
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
