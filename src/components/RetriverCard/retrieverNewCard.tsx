"use client";
import { Box, Chip, Typography } from "@mui/material";
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
  database: string;
  schema?: string;
  type?: string;
  models?: any[];
  variables?: any[];
  onClick?: () => void;
}

const RetriverNewCard: FC<retriverCardProps> = ({
  database,
  icon,
  status,
  title,
  schema,
  type,
  variables,
  models,
  onClick,
}) => {
  return (
    <Box
      sx={{
        width: "610px",
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
              alignItems: "start",
              width: "40%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography variant="text-md-semibold">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexDirection: "column",
                textAlign: "start",
              }}
            >
              {" "}
              <Typography variant="text-sm" sx={{ textAlign: "start" }}>
                <span style={{ fontWeight: 500 }}> Database: </span>
                {database}
              </Typography>
              <Typography variant="text-sm">
                <span style={{ fontWeight: 500 }}> Schema:</span>{" "}
                {schema ?? "---"}
              </Typography>
              <Typography variant="text-sm">
                <span style={{ fontWeight: 500 }}> Type:</span> {type ?? "---"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "60%" }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 1,
                flexDirection: "column",
                textAlign: "start",
              }}
            >
              <Typography variant="text-sm">
                <span style={{ fontWeight: 500 }}> Models:</span>{" "}
                {models?.map((item) => (
                  <Chip label={item.name} sx={{ m: 0.2 }} size="small" />
                )) ?? "---"}
              </Typography>
              <Typography variant="text-sm">
                <span style={{ fontWeight: 500 }}> variables:</span>{" "}
                {variables?.map((item) => (
                  <Chip label={item.name} size="small" sx={{ m: 0.2 }} />
                )) ?? "---"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RetriverNewCard;
