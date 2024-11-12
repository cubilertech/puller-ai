import { palette } from "@/theme/Palette";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { FC, useState } from "react";
import "./CustomButtons.css";
import { CustomButtonVariants, UserProps } from "@/utils/types";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Menu } from "@/components/Menu";
import { History } from "@mui/icons-material";

interface buttonProps {
  variant: CustomButtonVariants;
  text?: string;
  selectData?: UserProps;
  onClick?: () => void;
  sx?: SxProps;
}

const CustomButton: FC<buttonProps> = ({
  variant,
  selectData,
  text,
  onClick,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isImage =
    variant === "select" && selectData?.avatar
      ? selectData.avatar
      : "/default-avatar.png";

  switch (variant) {
    case "smallbutton":
      return (
        <div className="container-btn-small">
          <Button
            sx={{
              borderRadius: "5px",
              backgroundColor: palette.color.gray[250],
              height: "22px !important",
              width: "80px !important",
              pr: 0,
              pl: 0,
              pt: 1.2,
              m: 0,
              mt: -0.6,
              ":hover": {
                backgroundColor: palette.color.gray[400],
              },
            }}
            onClick={onClick}
            variant="outlined"
          >
            <Typography
              variant="text-xs"
              sx={{ color: palette.color.eggWhite }}
            >
              {text}
            </Typography>
          </Button>
        </div>
      );
    case "rounded-SQL":
      return (
        // <div className="container-round-btn">
        <Button
          sx={{
            border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
            backgroundColor: "none",
            width: 60,
            height: "32px !important",
            py: 2,
            px: 4,
            fontSize: "16px",
            background: "none !important",
            ":hover": {
              background: palette.linearGradient.darkBlue,
            },
            ...sx,
          }}
          size="small"
          onClick={onClick}
          variant="outlined"
        >
          {text}
        </Button>
        // </div>
      );
    case "select":
      const menuItems = [
        {
          text: "Logout",
          
        },
      ];
      return (
        <>
          {/* <div className="container-round-btn"> */}
          <Button
            sx={{
              borderRadius: "50px",
              color: palette.base.white,
              border: `none`,
              background: `none !important`,
              width: 82,
              height: 48,
              py: 1,
              px: 1.2,
              ":hover": {
                border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
                borderRadius: "50px !important",
                background: `${palette.color.gray[300]} !important`,
              },
            }}
            size="large"
            variant="outlined"
            onClick={handleMenuOpen}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "13px",
              }}
            >
              <Image
                style={{ marginBottom: "2px" }}
                width={26}
                height={26}
                src={isImage}
                alt="profile-picture"
              />
              {/* <Typography variant="text-md-bold">{selectData?.name}</Typography> */}

              <Icon icon="topbarIcon" width={11} height={11} />
            </Box>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            menuItems={menuItems}
            onClose={handleMenuClose}
          />

          {/* </div> */}
        </>
      );
    case "round":
      return (
        <div className="round-btn-container">
          <Button
            variant="text"
            sx={{
              borderRadius: "100%",
              bgcolor: palette.color.gray[550],
              p: 0,
              minWidth: 20,
              width: "20px !important",
              height: "20px !important",
              fontSize: "10px !important",
              ":hover": {
                borderRadius: "100%",
                backgroundColor: palette.color.gray[500],
              },
            }}
          >
            {text}
          </Button>
        </div>
      );
    case "request-history":
      return (
        <Box className={"animated-request"}>
          <History sx={{ width: "21px", height: "23px" }} />
          <Typography variant="text-sm-semibold">{text}</Typography>
        </Box>
      );
      case "google-login":
        return (
          <Button variant="contained" sx={{bg: "white !important", bgcolor: "white", color: "black"}} fullWidth size="large">
           <Typography variant="text-md-bold" sx={{display: "flex",gap: 1}}><Icon icon="googleLogo" /> {text}</Typography>
          </Button>
        );
  }
};

export default CustomButton;
