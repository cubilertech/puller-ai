import CustomButton from "@/common/CustomButtons/CustomButtons";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";

const AlertsPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "calc(100vh - 130px)",
      }}
    >
      <PageHeader type="Alerts" />

      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        type="light-border"
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "2rem",
            bgcolor: "rgb(65,74,86)",
            padding: "1.5rem 1.5rem 0.5rem",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "flex",
            gap: "2rem",
          }}
        >
          <Typography
            variant="text-sm-semibold"
            sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            All
            <CustomButton variant="round" text="2" />{" "}
          </Typography>
          <Typography variant="text-sm-semibold">Unread</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AlertsPage;
