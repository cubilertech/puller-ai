import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../Button";
import { ConnectItem } from "@/utils/types";
import { Divider } from "../Divider";
import { palette } from "@/theme/Palette";
import "./connectCard.css";

interface ConnectCardProps {
  item: ConnectItem;
  onClick?: () => void;
  isLoading?: boolean;
  onNameClick?: () => void;
}

const ConnectCard: FC<ConnectCardProps> = ({
  item,
  onClick,
  isLoading,
  onNameClick,
}) => {
  return (
    <>
      <Box
        sx={{
          padding: "1rem 2rem",
        }}
      >
        {/* Card Container */}
        <Box display={"flex"} py={"0.5rem"} justifyContent={"space-between"}>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Image src={item?.image} alt="pic" width={37} height={37} />
            <Typography
              variant="text-md-semibold"
              onClick={onNameClick}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                  textDecorationColor: palette.color.gray[50],
                },
              }}
            >
              {item.name}
            </Typography>
          </Box>
          <Box
            sx={{ position: "relative" }}
            className={isLoading ? "looping-opacity" : "opacity-out"}
          >
            <Button
              disabled={isLoading}
              variant={item.isConnected ? "contained" : "outlined"}
              label={
                isLoading ? "" : item.isConnected ? "Connected" : "Connect"
              }
              fullWidth
              sx={{
                width: "98px",
                height: "34px",
              }}
              onClick={onClick}
            />
            {isLoading && (
              <CircularProgress
                sx={{
                  color: palette.base.white,
                  position: "absolute",
                  top: 5.4,
                  zIndex: 5,
                  left: 38,
                }}
                size={24}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Divider
        type="light"
        sx={{
          backgroundColor:
            "linear-gradient(142.96deg, rgba(57, 57, 57, 0.6) -3.54%, rgba(97, 97, 97, 0.6) 99.99%) !important",
        }}
      />
    </>
  );
};

export default ConnectCard;
