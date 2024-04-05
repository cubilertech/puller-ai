import { palette } from "@/theme/Palette";
import { Box } from "@mui/material";
import IconButton from "../IconButton/iconButton";
import { ArrowBack } from "@mui/icons-material";
import { Icon } from "../Icon";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";

const TopNavBar = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "20px 48px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "211px",
          bgcolor: "rgba(102, 112, 133, 0.60)",
        }}
      >
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
