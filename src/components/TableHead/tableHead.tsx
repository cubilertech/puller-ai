import {
  Box,
  TableCell,
  TableRow,
  TableHead as MuiTableHead,
} from "@mui/material";
// import { TableCell } from "../TableCell";
import { Icon } from "../Icon";
import { FC } from "react";

interface TableHeadProps {
  columns: string[];
}

const TableHead: FC<TableHeadProps> = ({ columns }) => {
  return (
    <MuiTableHead sx={{ bgcolor: "transparent", bg: "transparent" }}>
      <TableRow>
        {columns?.map((column) => (
          <TableCell
            key={column}
            sx={{
              border: "none",
              backgroundColor: "#2a3a4b",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                fontWeight: "bold",
                // color={"#32384e"}
              }}
            >
              {column} <Icon icon="arrowDown" width={12} height={12} />
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
