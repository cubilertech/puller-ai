"use client";
import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { usePathname, useRouter } from "next/navigation";
import { CURRENT_MODE, MODES, PagesType, isPilotMode } from "@/utils/constants";
import CustomLink from "../Link/link";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import { AlertModal } from "@/modals/AlertModal";
import { useEffect, useState } from "react";

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
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  useEffect(() => {
    const companyName = localStorage.getItem('companyName');
    if(!companyName) {
      router.push("/")
    }
  }, [])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 31px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "211px",
          bgcolor: palette.opacity.lightBlue,
        }}
      >
        <Box>
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
            gap: "8px",
          }}
        >
          <NotificationIconButton
            icon="annotation"
            iconHeight={24}
            iconWidth={24}
            onClick={() => handleClickAlerts()}
            isNotice={isPilotMode ? false : true}
          />
          <NotificationIconButton
            icon="bell"
            iconHeight={24}
            iconWidth={24}
            isNotice={isPilotMode ? false : true}
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
