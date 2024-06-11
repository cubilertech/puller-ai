"use client";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Pagination, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { ACTIVE_TYPES } from "@/utils/constants";
import { TemplateCardList } from "@/components/TemplateCardList";
import { TemplateTopbar } from "@/components/TemplateTopbar";
import { useGetNewTimeStampPrompt } from "@/hooks/usePrompt";
import { Loader } from "@/components/Loader";

const TemplatePage = () => {
  let currectTimeStamp = Date.now();
  const [isActive, setIsActive] = useState(ACTIVE_TYPES.PRIVATE);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [activePage, setActivePage] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newTimeStamp, setNewTimeStamp] = useState<number | null>(null);

  const { data, refetch, isLoading, isRefetching } = useGetNewTimeStampPrompt(
    newTimeStamp ?? currectTimeStamp
  );
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
  const handlePageChange = (page: number) => {
    setActivePage(page);
    setPage(page);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    refetch();
  }, [isActive, refetch]);

  const totalPages = Math.ceil((pullsList?.length || 0) / rowsPerPage);
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
            <Box>
              {/* <>
                <Button
                  onClick={handleButtonClick}
                  endIcon={<KeyboardArrowUp />}
                  variant="outlined"
                  size="small"
                >
                  <Typography variant="text-xs-medium">
                    Show {rowsPerPage}
                  </Typography>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {[5, 8, 10, 15, 20].map((value, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setRowsPerPage(value);
                        setPage(0);
                        setActivePage(0);
                      }}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Menu>
              </> */}
            </Box>

            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                onClick={() => handlePageChange(page - 1)}
                label=""
                variant="text"
                disabled={page === 0}
                sx={{
                  minWidth: 32,
                  width: "32px !important ",
                  height: "32px !important ",
                  border:
                    page === 0
                      ? "1px solid rgba(225,225,225,0.4)"
                      : "1px solid white",
                  ":hover": {
                    backgroundColor: "transparent",
                    opacity: 1,
                  },
                }}
              >
                <Icon icon="paginationLeft" disabled={page === 0} />
              </Button>

              {[...Array(totalPages).keys()].map((pageNumber, i) => (
                <Button
                  key={i}
                  variant="text"
                  label={(pageNumber + 1).toString()}
                  onClick={() => handlePageChange(pageNumber)}
                  sx={{
                    minWidth: 32,
                    width: "32px !important ",
                    height: "32px !important ",
                    backgroundColor:
                      activePage === pageNumber ? "#5D92FE" : "inherit",
                    ":hover": {
                      backgroundColor: "#5D92FE",
                    },
                  }}
                />
              ))}

              <Button
                onClick={() => handlePageChange(page + 1)}
                label=""
                variant="text"
                disabled={
                  page === Math.ceil((pullsList?.length ?? 0) / rowsPerPage) - 1
                }
                sx={{
                  minWidth: 32,
                  width: "32px !important ",
                  height: "32px !important ",
                  border:
                    page ===
                    Math.ceil((pullsList?.length ?? 0) / rowsPerPage) - 1
                      ? "1px solid rgba(225,225,225,0.4)"
                      : "1px solid white",
                  ":hover": {
                    backgroundColor: "transparent",
                    opacity: 1,
                  },
                }}
              >
                <Icon
                  icon="paginationRight"
                  disabled={
                    page ===
                    Math.ceil((pullsList?.length ?? 0) / rowsPerPage) - 1
                  }
                />
              </Button>
            </Box> */}
            <Stack spacing={2}>
              <Pagination
                disabled={isRefetching}
                count={10}
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
