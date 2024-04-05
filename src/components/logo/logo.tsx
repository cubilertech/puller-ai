import { Box } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";
import { Icon } from "../Icon";

interface logoProps {
  variant?: "login" | "default";
}

const Logo: FC<logoProps> = ({ variant }) => {
  return (
    <>
      {variant === "login" ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon width={186} height={63} icon="logoIcon" />
            <Box
              sx={{
                marginLeft: "-30px",
                marginBottom: "18px",
              }}
            >
              <Icon width={186} height={63} icon="logoTitle" />
            </Box>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            marginRight: "35px",
          }}
        >
          <Icon width={186} height={63} icon="logo" />
        </Box>
      )}
    </>
  );
};

export default Logo;
