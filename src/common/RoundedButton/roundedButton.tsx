import { palette } from "@/theme/Palette";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

import "./roundedButton.css";
import { UserProps } from "@/utils/types";
import Image from "next/image";
import { Icon } from "@/components/Icon";

interface buttonProps {
  variant: "select" | "button";
  selectData?: UserProps;
}

const RoundedButton: FC<buttonProps> = ({ variant, selectData }) => {
  const isImage =
    variant === "select" && selectData?.avatar
      ? selectData.avatar
      : "/default-avatar.png";

  switch (variant) {
    case "button":
      return (
        <div className="container-round-btn">
          <Button
            sx={{
              borderRadius: "50px",
              border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
              backgroundColor: "#425459",
              width: 82,
              height: 40,
              py: 2,
              px: 4,
            }}
            variant="outlined"
          >
            <Typography variant="text-md-bold">SQL</Typography>
          </Button>
        </div>
      );
    case "select":
      return (
        <div className="container-round-btn">
          <Button
            sx={{
              borderRadius: "50px",
              border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
              backgroundColor: "rgb(115,129,133)",
              width: 122,
              height: 48,
              py: 2,
              px: 4,
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Image
                width={50}
                height={50}
                src={isImage}
                alt="profile-picture"
              />
              <Typography variant="text-md-bold">{selectData?.name}</Typography>

              <Icon icon="arrowDown" />
            </Box>
          </Button>
        </div>
      );
  }
};

export default RoundedButton;
