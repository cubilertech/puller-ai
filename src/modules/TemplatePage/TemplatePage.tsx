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

const TemplatePage = () => {
  let currectTimeStamp = Date.now();
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.PRIVATE);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(20);
  // const [activePage, setActivePage] = useState<number>(0);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
    let result = data && isActive === ACTIVE_TYPES.PRIVATE ? data?.items : [];
    // console.log("runing")
    if (search?.length) {
      result = result?.filter(
        (item) =>
          item?.id?.toLowerCase().includes(search) ||
          item?.description?.toLowerCase().includes(search)
      );
    }
    setTotalPages(
      isDemoMode
        ? Math.ceil((result?.length || 0) / 20)
        : Math.ceil((data?.total || 0) / 20)
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
    refetch();
  }, []);

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
      refetch();
    }
  }, [newTimeStamp]);

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
