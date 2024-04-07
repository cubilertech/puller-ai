import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Button } from "../Button";
import { ArrowUpward } from "@mui/icons-material";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";

const tabelData = [
  {
    id: "1234d",
    email: "test@test.com",
    lastInteract: "019128182198",
    timestamp: "3/11/24",
    totalTxns: "23000",
  },
  {
    id: "122323",
    email: "test@2test.com",
    lastInteract: "01322119128182198",
    timestamp: "2/21/22",
    totalTxns: "2322",
  },
  {
    id: "12333",
    email: "test3@3test3.com",
    lastInteract: "3338182198",
    timestamp: "3/13/23",
    totalTxns: "23333",
  },
];

const DataTable = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <TableContainer sx={{ bgcolor: "transparent", border: "none" }}>
        <Table>
          <TableBody>
            {/* <TableHead> */}
            <TableRow>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Customer ID
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Last Interact
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Timestamp
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Total TXNS
              </TableCell>
            </TableRow>
            {/* </TableHead> */}
            {tabelData.map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  sx={{
                    border: "none",
                  }}
                >
                  {item.id}
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                  }}
                >
                  {item.email}
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                  }}
                >
                  {item.lastInteract}
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                  }}
                >
                  {item.timestamp}
                </TableCell>
                <TableCell
                  sx={{
                    border: "none",
                  }}
                >
                  {item.totalTxns}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
            //   justifyContent: "space-around",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Box>
            <Button
              label="Show 10"
              variant="outlined"
              endIcon={<ArrowUpward />}
            />
          </Box>
          <Typography variant="text-md-regular">
            Showing 1 to 10 of 552 entries
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Icon icon="minus" />
          <Button variant="text" label="1" />
          <Button variant="text" label="2" />
          <Button variant="text" label="3" />
          <Icon icon="plus" />
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;
