import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../Button";
import { ConnectItem } from "@/utils/types";
import { Divider } from "../Divider";
import { CURRENT_MODE, MODES } from "@/utils/constants";

interface ConnectCardProps {
  item: ConnectItem;
}

const ConnectCard: FC<ConnectCardProps> = ({ item }) => {
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
            <Typography variant="text-md-semibold">{item.name}</Typography>
          </Box>
          <Box>
            <Button
              variant={item.isConnected ? "contained" : "outlined"}
              label={item.isConnected ? "Connected" : "Connect"}
              fullWidth
              sx={{
                width: "98px",
                height: "34px",
              }}
              onClick={
                CURRENT_MODE === MODES.PILOT
                  ? () => alert("Restricted Access")
                  : undefined
              }
            />
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
