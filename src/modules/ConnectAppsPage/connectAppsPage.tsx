"use client";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ConnectCard } from "@/components/ConnectCard";
import { CONNECT_APP_DATA } from "@/utils/data";
import { Input } from "@/components/Input";
import { palette } from "@/theme/Palette";
import { AlertModal } from "@/modals/AlertModal";
import { useEffect, useState } from "react";
import { isPilotMode } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getConnectQuery,
  updateConnectQuery,
} from "@/libs/redux/features/searchbar";
import { useGetAllApps, useUpdateAppStatus } from "@/hooks/useRetriever";
import { Loader } from "@/components/Loader";
import { ConnectItem } from "@/utils/types";

const ConnectAppsPage = () => {
  const query = useAppSelector(getConnectQuery);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: ConnectApps,
    refetch: ConnectAppRefetch,
    isLoading: LoadingApps,
    isSuccess: isSuccessApps,
  } = useGetAllApps();
  const { mutate: UpdateAppStatus, isSuccess: AppStatusUpdated } =
    useUpdateAppStatus();
  const handleCreateRetriever = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else router.push("/retrievers/upload");
  };
  const handleCardConnect = (item: ConnectItem) => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      UpdateAppStatus({ id: item.id, status: !item.isConnected });
    }
  };
  const filteredData = ConnectApps?.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    if (AppStatusUpdated) {
      ConnectAppRefetch();
    }
  }, [AppStatusUpdated]);
  useEffect(() => {
    ConnectAppRefetch();
  }, [ConnectAppRefetch]);
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
            height: "5rem",
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
            value={query}
            onChange={(e) => dispatch(updateConnectQuery(e.target.value))}
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
            height: "90%",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {LoadingApps ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader type="Loading" variant="simple" isLoading={LoadingApps} />
            </Box>
          ) : filteredData && filteredData.length <= 0 ? (
            <Typography
              variant="text-lg-bold"
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                color: palette.opacity.lightGray,
                display: "flex",
                alignItems: "center",
              }}
            >
              No Connect Apps
            </Typography>
          ) : (
            filteredData?.map((item, index) => (
              <ConnectCard
                key={index}
                item={item}
                onClick={() => handleCardConnect(item)}
              />
            ))
          )}
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
