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
    <MuiTableHead
      sx={{
        bgcolor: "transparent",
        position: "sticky",
        top: 0,
        // background: rgb(46,38,70);
        borderRadius: "0px !important",
        background:
          "linear-gradient(86deg, rgba(50,38,72, 1) 0%, rgba(35,41,64,1) 50%, rgba(25,48,60,1) 100%)",
      }}
    >
      <TableRow sx={{ borderRadius: "0px !important" }}>
        {columns?.map((column) => (
          <TableCell
            key={column}
            sx={{
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                fontWeight: "bold",
                fontSize: "16px",
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
