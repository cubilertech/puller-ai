import {
  Box,
  TableCell,
  TableRow,
  TableHead as MuiTableHead,
} from "@mui/material";
// import { TableCell } from "../TableCell";
import { Icon } from "../Icon";

const TABLEHEADER_DATA = ["Email", "Last Interact", "Timestamp", "Total TXNS"];

const TableHead = () => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell
          sx={{
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            Customer ID
          </Box>
        </TableCell>
        <TableCell
          sx={{
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            Email <Icon icon="arrowDown" width={12} height={12} />
          </Box>
        </TableCell>
        <TableCell
          sx={{
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            Last Interact <Icon icon="arrowDown" width={12} height={12} />
          </Box>
        </TableCell>
        <TableCell
          sx={{
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            Timestamp <Icon icon="arrowDown" width={12} height={12} />
          </Box>
        </TableCell>
        <TableCell
          sx={{
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            Total TXNS <Icon icon="arrowDown" width={12} height={12} />
          </Box>
        </TableCell>
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
