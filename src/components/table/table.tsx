"use client";
import React, { FC, useMemo, useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Button } from "../Button";
import {
  ArrowUpward,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Icon } from "../Icon";
import { TableHead } from "../TableHead";
import { TABLEDATA } from "@/utils/constants";
import { Prompt } from "@/utils/types";
import { palette } from "@/theme/Palette";

interface DataTableProps {
  data: Prompt;
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [activePage, setActivePage] = useState<number>(0);
  const handlePageChange = (page: number) => {
    setActivePage(page);
    setPage(page);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rows = useMemo(() => {
    const selectVar = data?.variables?.find(
      (item) => item.id === "top_skus_number"
    );

    if (data && selectVar && Number(selectVar.value)) {
      return data?.rows?.slice(0, Number(selectVar.value));
    } else if (data.id === "query#1234567891") {
      const selectVar = data?.variables?.find(
        (item) => item.id === "four_quarters"
      );
      if (data && selectVar?.value) {
        const modifiedR = data?.rows?.map((item) => {
          return {
            ...item,
            Quarter: selectVar?.value,
          };
        });
        return modifiedR;
      }
    } else {
      return data?.rows;
    }
  }, [data]);

  const columns = useMemo(() => {
    if (data.id === "query#1234567890") {
      const cols = ["Region", "Product"];
      const selectVar = data?.variables?.find(
        (item) => item.id === "revenue_txt"
      );
      if (selectVar) {
        const val = (selectVar.value as string).toLowerCase();
        if (val.includes("units")) {
          cols.push("Units Sold");
        } else if (val.includes("margin")) {
          cols.push("Profit Margin");
        } else if (val.includes("revenue")) {
          cols.push("Revenue");
        }
      }
      return cols;
    } else return data.columns;
  }, [data]);

  const totalPages = Math.ceil((rows?.length || 0) / rowsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {rows && rows?.length ? (
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 270px)", // Adjust height based on your needs
            overflowY: "auto",
            scrollbarWidth: "none", // Enable vertical scrolling
          }}
        >
          <Table
            stickyHeader
            sx={{
              ".MuiTable-stickyHeader": {
                bgcolor: "transparent",
              },
            }}
          >
            <TableHead columns={columns as string[]} />
            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns?.map((column, colIndex) => (
                      <TableCell key={colIndex} sx={{ border: "none" }}>
                        {row[column as keyof typeof row]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            color: palette.color.gray[500],
          }}
        >
          no Table Data Found
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Box>
            <>
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
                {[5, 8, 10, 13].map((value, index) => (
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
            </>
          </Box>
          <Typography variant="text-xs-medium" color={"#C8C8C8"}>
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, rows?.length ?? 0)} of{" "}
            {rows?.length ?? 0} entries
          </Typography>
        </Box>

        <Box
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
            disabled={page === Math.ceil((rows?.length ?? 0) / rowsPerPage) - 1}
            sx={{
              minWidth: 32,
              width: "32px !important ",
              height: "32px !important ",
              border:
                page === Math.ceil((rows?.length ?? 0) / rowsPerPage) - 1
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
                page === Math.ceil((rows?.length ?? 0) / rowsPerPage) - 1
              }
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
