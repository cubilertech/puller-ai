"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  ACTIVE_TYPES,
  isDemoMode,
  isPilotMode,
  PULLS_TYPES,
} from "@/utils/constants";
import { TemplateCardList } from "@/components/TemplateCardList";
import { TemplateTopbar } from "@/components/TemplateTopbar";
import { useGetAllPrompt, useGetNewTimeStampPrompt } from "@/hooks/usePrompt";
import { Loader } from "@/components/Loader";
import { Prompt, Query } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useGetAllExecute } from "@/hooks/useExecute";
import { idea } from "react-syntax-highlighter/dist/esm/styles/hljs";

const TemplatePage = () => {
  let currectTimeStamp = Date.now();
  const [isActive, setIsActive] = useState(PULLS_TYPES.PROMPTS);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const [page, setPage] = useState(0);
  const [pagePulls, setPagePulls] = useState(0);
  const [newTimeStamp, setNewTimeStamp] = useState<number | null>(null);
  const [newTimeStampPulls, setNewTimeStampPulls] = useState<number | null>(
    null
  );
  const [totalPages, setTotalPages] = useState<number>(10);
  const [totalPagesPulls, setTotalPagesPulls] = useState<number>(10);
  const {
    data: allPulls,
    refetch: refetchPulls,
    isFetching,
  } = useGetAllExecute(newTimeStampPulls ?? currectTimeStamp);
  const getAllPrompt = useGetAllPrompt();
  const getNewTimeStampePrompt = useGetNewTimeStampPrompt(
    newTimeStamp ?? currectTimeStamp
  );
  const { data, refetch, isLoading, isRefetching } = isPilotMode
    ? getNewTimeStampePrompt
    : getAllPrompt;
  const promptsList = useMemo(() => {
    let result: Prompt[] = [];

    if (data && isActive === PULLS_TYPES.PROMPTS) {
      if (isDemoMode) {
        result = (data as unknown as Prompt[]) || [];
      } else {
        result = (data?.items as Prompt[]) || [];
      }
    }
    if (search?.length) {
      result = result?.filter(
        (item: any) =>
          item?.id?.toLowerCase().includes(search) ||
          item?.description?.toLowerCase().includes(search)
      );
    }
    setTotalPages(
      isDemoMode
        ? Math.ceil((result?.length || 0) / 20)
        : Math.ceil((data && "total" in data ? (data as any).total : 0) / 20)
    );
    return result;
  }, [data, isActive, search]);

  useEffect(() => {
    if (isPilotMode && projectId && orgId) {
      refetch();
      refetchPulls();
    } else if (isDemoMode) {
      refetch();
    }
  }, [projectId, orgId]);

  useEffect(() => {
    if (allPulls && "total" in allPulls) {
      setTotalPagesPulls(
        Math.ceil((allPulls.total as number) / 20)
      );
    }
  }, [allPulls]);

  const onPageChange = (pagenum: number) => {
    let newTimeStamp = null;
    let promptsListLength = promptsList.length;

    if (pagenum < page) {
      newTimeStamp =
        promptsListLength > 0 ? promptsList[0].timestamp : currectTimeStamp;
    } else {
      newTimeStamp =
        promptsListLength > 0
          ? promptsList[promptsListLength - 1].timestamp
          : currectTimeStamp;
    }

    console.log(newTimeStamp, "newTimeStamp");
    setNewTimeStamp(newTimeStamp as number);
    setPage(pagenum);
  };

  const onPageChangePulls = (pagenum: number) => {
    let newTimeStamp = null;
    let promptsListLength = allPulls?.items.length ?? 0;

    if (pagenum < pagePulls) {
      newTimeStamp =
        promptsListLength > 0 ? allPulls?.items[0].timestamp : currectTimeStamp;
    } else {
      newTimeStamp =
        promptsListLength > 0
          ? allPulls?.items[promptsListLength - 1].timestamp
          : currectTimeStamp;
    }

    console.log(newTimeStamp, "newTimeStamp");
    setNewTimeStampPulls(newTimeStamp as number);
    setPagePulls(pagenum);
  };

  useEffect(() => {
    if (newTimeStamp !== null) {
      if (isPilotMode && projectId && orgId) {
        refetch();
      } else if (isDemoMode) {
        refetch();
      }
    }
    if (newTimeStampPulls !== null) {
      if (isPilotMode) {
        refetchPulls();
      }
    }
  }, [newTimeStamp, newTimeStampPulls, projectId, orgId]);

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
            paddingTop: "1.2rem",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
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
              <Loader type="Loading" variant="simple" />
            </Box>
          ) : (
            <TemplateCardList
              isActive={isActive}
              prompts={promptsList}
              pulls={(allPulls?.items as Query[]) ?? []}
            />
          )}

          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box></Box>
            {isActive === PULLS_TYPES.PROMPTS ? (
              <Stack spacing={2}>
                <Pagination
                  disabled={isRefetching}
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={(e, pagenum) => onPageChange(pagenum)}
                />
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Pagination
                  disabled={isFetching}
                  count={totalPagesPulls}
                  variant="outlined"
                  shape="rounded"
                  onChange={(e, pagenum) => onPageChangePulls(pagenum)}
                />
              </Stack>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
