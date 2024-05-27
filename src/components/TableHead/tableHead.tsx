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
    <MuiTableHead>
      <TableRow>
        {columns?.map((column) => (
          <TableCell key={column} sx={{ border: "none" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
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
