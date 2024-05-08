"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ACTIVE_TYPES } from "@/utils/constants";
import { TemplateCardList } from "@/components/TemplateCardList";
import { TemplateTopbar } from "@/components/TemplateTopbar";
import { useGetAllPrompt } from "@/hooks/usePrompt";
import { Loader } from "@/components/Loader";

const TemplatePage = () => {
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.PRIVATE);
  const [search, setSearch] = useState("");
  const { data, isLoading, refetch } = useGetAllPrompt();

  useEffect(() => {
    refetch();
  }, [isActive, refetch]);
  const pullsList = useMemo(() => {
    let result = data && isActive === ACTIVE_TYPES.PRIVATE ? data : [];
    if (search?.length) {
      result = result?.filter(
        (item) =>
          item?.id?.toLowerCase().includes(search) ||
          item?.description?.toLowerCase().includes(search)
      );
    }
    return result;
  }, [data, isActive, search]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      px={"1rem"}
      pt={"1.5rem"}
      gap={"1.5rem"}
      height={"100%"}
    >
      <PageHeader title="Pulls Inventory" />

      {/* Table Container */}
      <Box height={"88%"}>
        <Paper
          sx={{
            padding: "1.5rem",
            height: "100%",
            paddingY: "1.2rem",
            display: "flex",
            flexDirection: "column",
          }}
          variant="light-border"
        >
          {/* Topbar */}
          <TemplateTopbar
            isActive={isActive}
            setIsActive={setIsActive}
            search={search}
            setSearch={setSearch}
          />

          {/* Card List */}
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Loader type="Processing" variant="simple" />
            </Box>
          ) : (
            <TemplateCardList isActive={isActive} pulls={pullsList} />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
