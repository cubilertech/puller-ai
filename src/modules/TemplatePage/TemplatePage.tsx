"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Pagination, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ACTIVE_TYPES, isDemoMode, isPilotMode } from "@/utils/constants";
import { TemplateCardList } from "@/components/TemplateCardList";
import { TemplateTopbar } from "@/components/TemplateTopbar";
import { useGetAllPrompt, useGetNewTimeStampPrompt } from "@/hooks/usePrompt";
import { Loader } from "@/components/Loader";
import { Prompt } from "@/utils/types";
import { useSearchParams } from "next/navigation";

const TemplatePage = () => {
  let currectTimeStamp = Date.now();
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.PRIVATE);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const [page, setPage] = useState(0);
  const [newTimeStamp, setNewTimeStamp] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number>(10);
  const getAllPrompt = useGetAllPrompt();
  const getNewTimeStampePrompt = useGetNewTimeStampPrompt(
    newTimeStamp ?? currectTimeStamp
  );
  const { data, refetch, isLoading, isRefetching } = isPilotMode
    ? getNewTimeStampePrompt
    : getAllPrompt;
  const pullsList = useMemo(() => {
    let result: Prompt[] = [];

    if (data && isActive === ACTIVE_TYPES.PRIVATE) {
      if (isDemoMode) {
        // Ensure data is not null or undefined before casting
        result = (data as unknown as Prompt[]) || [];
      } else {
        // Safely access items if data is not null or undefined
        result = (data?.items as unknown as Prompt[]) || [];
      }
    }
    // console.log("runing")
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
        : Math.ceil((data && "total" in data ? data.total : 0 || 0) / 20)
    );
    return result;
  }, [data, isActive, search]);

  // const handlePageChange = (page: number) => {
  //   setActivePage(page);
  //   setPage(page);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  useEffect(() => {
    if (isPilotMode && projectId && orgId) {
      refetch();
    } else if (isDemoMode) {
      refetch();
    }
  }, [projectId, orgId]);

  // Initialize before onPageChange

  const onPageChange = (pagenum: number) => {
    let newTimeStamp = null;
    let pullsListLength = pullsList.length;

    if (pagenum < page) {
      newTimeStamp =
        pullsListLength > 0 ? pullsList[0].timestamp : currectTimeStamp;
    } else {
      newTimeStamp =
        pullsListLength > 0
          ? pullsList[pullsListLength - 1].timestamp
          : currectTimeStamp;
    }

    console.log(newTimeStamp, "newTimeStamp");
    setNewTimeStamp(newTimeStamp as number);
    setPage(pagenum);
  };
  useEffect(() => {
    if (newTimeStamp !== null) {
      if (isPilotMode && projectId && orgId) {
        refetch();
      } else if (isDemoMode) {
        refetch();
      }
    }
  }, [newTimeStamp, projectId, orgId]);

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
              pulls={
                pullsList
                //   ?.slice(
                //   page * rowsPerPage,
                //   page * rowsPerPage + rowsPerPage
                // )
              }
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

            <Stack spacing={2}>
              <Pagination
                disabled={isRefetching}
                count={totalPages}
                variant="outlined"
                shape="rounded"
                onChange={(e, pagenum) => onPageChange(pagenum)}
              />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TemplatePage;
