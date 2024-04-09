"use client";
import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";
import { Icon } from "../Icon";
import { usePathname } from "next/navigation";
import { PagesType } from "@/utils/constants";
import CustomLink from "../Link/link";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";

const TopNavBar = () => {
  const route = usePathname();
  const routeParts = route.replace(/^\//, "").split("/");
  const firstRoute = routeParts[0];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "20px 48px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "211px",
          bgcolor: "rgba(102, 112, 133, 0.60)",
        }}
      >
        <Box sx={{ ml: 4 }}>
          {firstRoute === PagesType.RECENT_REQUESTS ||
            (firstRoute === PagesType.PREVIEW_DATA && (
              <CustomLink href="/createRequest">
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
            ))}
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
        </Box>
      </Box>
    </>
  );
};
export default TopNavBar;
