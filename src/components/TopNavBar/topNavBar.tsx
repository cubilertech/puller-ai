"use client";
import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { usePathname, useRouter } from "next/navigation";
import { CURRENT_MODE, MODES, PagesType } from "@/utils/constants";
import CustomLink from "../Link/link";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import { AlertModal } from "@/modals/AlertModal";
import { useState } from "react";

const TopNavBar = () => {
  const route = usePathname();
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const routeParts = route.replace(/^\//, "").split("/");
  const firstRoute = routeParts[0];
  const isBack =
    routeParts.includes("preview") ||
    routeParts.includes("connect") ||
    routeParts.includes("recent") ||
    routeParts.includes("retriever-detail");

  const handleClickAlerts = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "15px 29px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "211px",
          bgcolor: palette.opacity.lightBlue,
        }}
      >
        <Box sx={{ ml: 4 }}>
          {isBack ? (
            <Box onClick={() => router.back()}>
              <Typography
                variant="text-md-bold"
                sx={{
                  color: palette.base.white,
                  display: "flex",
                  gap: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Icon icon="arrowLeftIcon" height={24} width={24} />
              </Typography>
            </Box>
          ) : firstRoute === PagesType.RECENT_REQUESTS ? (
            <CustomLink href={"/create"}>
              <Typography
                variant="text-md-bold"
                sx={{
                  color: palette.base.white,
                  display: "flex",
                  gap: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Icon icon="arrowLeftIcon" height={24} width={24} />
                Back
              </Typography>
            </CustomLink>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <NotificationIconButton
            icon="annotation"
            iconHeight={28}
            iconWidth={28}
            onClick={() => handleClickAlerts()}
            isNotice
          />
          <NotificationIconButton
            icon="bell"
            iconHeight={28}
            iconWidth={28}
            isNotice
            onClick={() => handleClickAlerts()}
          />
          <CustomButton
            variant="select"
            selectData={{ avatar: "/Images/Icons/avatar.svg", name: "Mav" }}
          />
        </Box>
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};
export default TopNavBar;
