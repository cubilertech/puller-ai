"use client";
import React, { FC, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import { TableHead } from "../TableHead";
import { palette } from "@/theme/Palette";

interface DataTableProps {
  data: any;
}

const DataTable: FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9999999999);

  // Transform columns data into rows
  const rows = useMemo(() => {
    const rowCount = data?.columns[0]?.values?.length || 0;
    return Array.from({ length: rowCount }, (_, rowIndex) => {
      const row: Record<string, any> = {};
      data.columns.forEach((column: any) => {
        // Check if the column type is "datetime"
        if (column.type === "datetime" && column.values[rowIndex]) {
          // Format the date value
          const dateValue = new Date(column.values[rowIndex]);
          row[column.name] = dateValue.toLocaleDateString(); // Format as 'MM/DD/YYYY' or use other format options
        } else if (column.type === "numeric" && column.values[rowIndex]) {
          const value = column.values[rowIndex];
          row[column.name] = value.toFixed(2);
        } else {
          row[column.name] = column.values[rowIndex] ?? "";
        }
      });
      return row;
    });
  }, [data]);

  const columns = useMemo(() => {
    return data?.columns.map((column: any) => column.name) || [];
  }, [data]);

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
      {rows && rows.length ? (
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 570px)", // Adjust height based on your needs
            overflowY: "auto",
            scrollbarWidth: "none", // Enable vertical scrolling
          }}
          className="table-container"
        >
          <Table stickyHeader>
            <TableHead columns={columns} isFilter />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column: any, colIndex: number) => (
                      <TableCell key={colIndex} sx={{ border: "none" }}>
                        {row[column]}
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
            height: "calc(100vh - 580px)",
            color: palette.color.gray[500],
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Icon width={186} height={63} icon="emptyTableIcon" />
            <Typography sx={{ fontSize: 24 }}> No Data Found</Typography>
          </Box>
        </Typography>
      )}
    </Box>
  );
};

export default DataTable;
