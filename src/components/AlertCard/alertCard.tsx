import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../Button";
import "./alertCard.css";
import { Divider } from "../Divider";

interface alertCardProps {
  name?: string;
  avatar: string;
  product?: string;
  price?: number;
  time: string;
  description?: string;
  type: "user" | "option";
  dataLength: number;
  index: number;
}

const AlertCard: FC<alertCardProps> = ({
  name,
  avatar,
  price,
  product,
  time,
  type,
  description,
  dataLength,
  index,
}) => {
  switch (type) {
    case "user":
      return (
        // Card Container
        <Box
          display={"flex"}
          flexDirection={"column"}
          bgcolor={"rgba(71, 84, 103, 0.3)"}
          sx={{
            borderBottomLeftRadius: index === dataLength - 1 ? "14px" : 0,
            borderBottomRightRadius: index === dataLength - 1 ? "14px" : 0,
          }}
          className="alert-card"
        >
          <Divider type="dark" sx={{ borderColor: "#393939" }} />
          {/* Layout Container for user notification */}
          <Box
            padding={"1rem"}
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Image src={avatar} alt="avatar" width={48} height={48} />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="text-sm-regular">
                <Typography variant="text-sm-semibold">{name} </Typography>
                {description}
                {product && (
                  <Typography variant="text-sm-semibold">
                    {" "}
                    {product}{" "}
                  </Typography>
                )}

                {price && (
                  <>
                    <span>totaling</span>
                    <Typography variant="text-sm-semibold">
                      {" "}
                      ${price}
                    </Typography>
                  </>
                )}
              </Typography>
              <Typography variant="text-xs-regular" sx={{mt: 1}}>{time}</Typography>
            </Box>
          </Box>
        </Box>
      );
    case "option":
      return (
        // Card Container
        <Box
          display={"flex"}
          flexDirection={"column"}
          bgcolor={"rgba(71, 84, 103, 0.3)"}
          sx={{
            borderBottomLeftRadius: index === dataLength - 1 ? "14px" : 0,
            borderBottomRightRadius: index === dataLength - 1 ? "14px" : 0,
          }}
          className="alert-card"
        >
          <Divider type="dark" />
          {/* Layout Container for option notification */}
          <Box
            padding={"1rem"}
            display={"flex"}
            alignItems={"flex-start"}
            gap={"1rem"}
          >
            <Image src={avatar} alt="avatar" width={48} height={48} />
            <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
              <Typography variant="text-sm-semibold">{description}</Typography>
              <Box
                sx={{
                  width: 368,
                  height: "32px !important",
                }}
              >
                <Button
                  sx={{
                    minHeight: 32,
                    height: "32px !important",
                    minWidth: 368,
                    p: 0,
                    fontSize: "12px !important"
                  }}
                  variant="outlined"
                  label="Explore Machine Segmentation Results for Last Week"
                />
              </Box>
              <Typography variant="text-xs-regular">{time}</Typography>
            </Box>
          </Box>
        </Box>
      );
  }
};

export default AlertCard;
