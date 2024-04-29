"use client";
import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { usePathname, useRouter } from "next/navigation";
import { PagesType } from "@/utils/constants";
import CustomLink from "../Link/link";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";
import CustomButton from "@/common/CustomButtons/CustomButtons";

const TopNavBar = () => {
  const route = usePathname();
  const router = useRouter();
  const routeParts = route.replace(/^\//, "").split("/");
  const firstRoute = routeParts[0];
  const isBack =
    routeParts.includes("preview") ||
    routeParts.includes("connect") ||
    routeParts.includes("recent") ||
    routeParts.includes("retriever-detail");

  return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "21px 48px",
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
                Back
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
            isNotice
          />
          <NotificationIconButton
            icon="bell"
            iconHeight={28}
            iconWidth={28}
            isNotice
          />
          <CustomButton
            variant="select"
            selectData={{ avatar: "/Images/Icons/avatar.svg", name: "Mav" }}
          />
        </Box>
      </Box>
  );
};
export default TopNavBar;
