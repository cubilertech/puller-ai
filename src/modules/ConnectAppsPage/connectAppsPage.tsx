"use client";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { ConnectCard } from "@/components/ConnectCard";
import { CONNECT_APP_DATA } from "@/utils/data";
import { Input } from "@/components/Input";
import { palette } from "@/theme/Palette";
import { AlertModal } from "@/modals/AlertModal";
import { useState } from "react";
import { CURRENT_MODE, MODES } from "@/utils/constants";

const ConnectAppsPage = () => {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleCreateRetriever = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    } else router.push("/retrievers/feedback");
  };
  const handleCardConnect = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    }
  };
  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
      }}
    >
      <PageHeader title="Connect App" />

      {/* Table */}
      <Paper
        variant="light-border"
        sx={{
          height: "calc(100vh - 210px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Topbar */}
        <Box
          sx={{
            background: palette.linearGradient.gray,
            borderTopRightRadius: "14px",
            minHeight: "5rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Search..."
            icon="search"
            width={409}
            height={44}
          />
          <Button
            variant="contained"
            sx={{
              width: "220px",
              height: "44",
            }}
            label="Create Retriever"
            onClick={() => handleCreateRetriever()}
          />
        </Box>

        <Box
          sx={{
            MaxHeight: "80%",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {CONNECT_APP_DATA.map((item, index) => (
            <ConnectCard
              key={index}
              item={item}
              onClick={() => handleCardConnect()}
            />
          ))}
        </Box>
      </Paper>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default ConnectAppsPage;
