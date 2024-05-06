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
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getConnectQuery,
  updateConnectQuery,
} from "@/libs/redux/features/searchbar";

const ConnectAppsPage = () => {
  const query = useAppSelector(getConnectQuery);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const filteredData = CONNECT_APP_DATA.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
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
            onClick={() => router.push("/retrievers/feedback")}
          />
        </Box>

        <Box
          sx={{
            MaxHeight: "80%",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {filteredData.map((item, index) => (
            <ConnectCard key={index} item={item} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConnectAppsPage;
