"use client";
import { ChangeEvent, MouseEvent } from "react";
import React, { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { ArrowUpward } from "@mui/icons-material";

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRows, setSelectedRows] = useState<number>(1);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value: number) => {
    setSelectedRows(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tabelData = [
    {
      id: "1",
      email: "test@test.com",
      lastInteract: "019128182198",
      timestamp: "3/11/24",
      totalTxns: "23000",
    },
    {
      id: "2",
      email: "test@2test.com",
      lastInteract: "01322119128182198",
      timestamp: "2/21/22",
      totalTxns: "2322",
    },
    {
      id: "3",
      email: "test3@3test3.com",
      lastInteract: "3338182198",
      timestamp: "3/13/23",
      totalTxns: "23333",
    },
    {
      id: "4",
      email: "test3@3test3.com",
      lastInteract: "3338182198",
      timestamp: "3/13/23",
      totalTxns: "23333",
    },
    {
      id: "5",
      email: "test3@3test3.com",
      lastInteract: "3338182198",
      timestamp: "3/13/23",
      totalTxns: "23333",
    },
    {
      id: "6",
      email: "test3@3test3.com",
      lastInteract: "3338182198",
      timestamp: "3/13/23",
      totalTxns: "23333",
    },
    {
      id: "7",
      email: "test4@4test4.com",
      lastInteract: "4444444444",
      timestamp: "4/14/24",
      totalTxns: "24444",
    },
    {
      id: "8",
      email: "test5@5test5.com",
      lastInteract: "5555555555",
      timestamp: "5/15/25",
      totalTxns: "25555",
    },
    {
      id: "9",
      email: "test6@6test6.com",
      lastInteract: "6666666666",
      timestamp: "6/16/26",
      totalTxns: "26666",
    },
    {
      id: "10",
      email: "test7@7test7.com",
      lastInteract: "7777777777",
      timestamp: "7/17/27",
      totalTxns: "27777",
    },
    {
      id: "11",
      email: "test8@8test8.com",
      lastInteract: "8888888888",
      timestamp: "8/18/28",
      totalTxns: "28888",
    },
    {
      id: "12",
      email: "test9@9test9.com",
      lastInteract: "9999999999",
      timestamp: "9/19/29",
      totalTxns: "29999",
    },
    {
      id: "13",
      email: "test10@10test10.com",
      lastInteract: "101010101010",
      timestamp: "10/20/30",
      totalTxns: "30000",
    },
    {
      id: "14",
      email: "test11@11test11.com",
      lastInteract: "111111111111",
      timestamp: "11/21/31",
      totalTxns: "31111",
    },
    {
      id: "15",
      email: "test12@12test12.com",
      lastInteract: "121212121212",
      timestamp: "12/22/32",
      totalTxns: "32222",
    },
    {
      id: "16",
      email: "test13@13test13.com",
      lastInteract: "131313131313",
      timestamp: "13/23/33",
      totalTxns: "33333",
    },
    {
      id: "17",
      email: "test14@14test14.com",
      lastInteract: "141414141414",
      timestamp: "14/24/34",
      totalTxns: "34444",
    },
    {
      id: "18",
      email: "test15@15test15.com",
      lastInteract: "151515151515",
      timestamp: "15/25/35",
      totalTxns: "35555",
    },
    {
      id: "19",
      email: "test16@16test16.com",
      lastInteract: "161616161616",
      timestamp: "16/26/36",
      totalTxns: "36666",
    },
    {
      id: "20",
      email: "test17@17test17.com",
      lastInteract: "171717171717",
      timestamp: "17/27/37",
      totalTxns: "37777",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  border: "none",
                }}
              >
                Title
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabelData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
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

      {/* <TablePagination
        rowsPerPageOptions={[1, 2, 3]}
        component="div"
        count={tabelData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
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
            {/* <Button label="Show 1" variant="outlined" endIcon={<ArrowUpward />}>
              <Select>
                <MenuItem onClick={() => setRowsPerPage(1)}>1</MenuItem>
                <MenuItem onClick={() => setRowsPerPage(2)}>2</MenuItem>
                <MenuItem onClick={() => setRowsPerPage(3)}>3</MenuItem>
                <MenuItem onClick={() => setRowsPerPage(4)}>4</MenuItem>
              </Select>
            </Button> */}
            {/* <RowsPerPageButton /> */}

            <>
              <Button
                onClick={handleButtonClick}
                endIcon={<ArrowUpward />}
                variant="outlined"
              >
                Show {rowsPerPage}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {[1, 2, 3, 4].map((value) => (
                  <MenuItem key={value} onClick={() => setRowsPerPage(value)}>
                    {value}
                  </MenuItem>
                ))}
              </Menu>
            </>
          </Box>
          <Typography variant="text-md-regular">
            Showing {page * rowsPerPage + 1} to{" "}
            {Math.min((page + 1) * rowsPerPage, tabelData.length)} of{" "}
            {tabelData.length} entries
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
            onClick={() => setPage((page) => page - 1)}
            label="-"
            variant="contained"
            disabled={page === 0}
          >
            <Icon icon="minus" />
          </Button>
          <Button variant="text" label="1" onClick={() => setPage(0)} />
          <Button variant="text" label="2" onClick={() => setPage(1)} />
          <Button variant="text" label="3" onClick={() => setPage(2)} />

          <Button
            onClick={() => setPage((page) => page + 1)}
            label="+"
            variant="contained"
            disabled={page === Math.ceil(tabelData.length / rowsPerPage) - 1}
          >
            <Icon icon="plus" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DataTable;

// const RowsPerPageButton: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedRows, setSelectedRows] = useState<number>(1);

//   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuItemClick = (value: number) => {
//     setSelectedRows(value);
//     setAnchorEl(null);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Button
//         onClick={handleButtonClick}
//         endIcon={<ArrowUpward />}
//         variant="outlined"
//       >
//         Show {selectedRows}
//       </Button>
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         {[1, 2, 3, 4].map((value) => (
//           <MenuItem key={value} onClick={() => value}>
//             {value}
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TablePagination,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import { Button } from "../Button";
// import { ArrowUpward } from "@mui/icons-material";
// import { IconButton } from "../IconButton";
// import { Icon } from "../Icon";

// const tabelData = [
//   {
//     id: "1234d",
//     email: "test@test.com",
//     lastInteract: "019128182198",
//     timestamp: "3/11/24",
//     totalTxns: "23000",
//   },
//   {
//     id: "122323",
//     email: "test@2test.com",
//     lastInteract: "01322119128182198",
//     timestamp: "2/21/22",
//     totalTxns: "2322",
//   },
//   {
//     id: "12333",
//     email: "test3@3test3.com",
//     lastInteract: "3338182198",
//     timestamp: "3/13/23",
//     totalTxns: "23333",
//   },
// ];

// const DataTable = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         height: "100%",
//       }}
//     >
//       <TableContainer sx={{ bgcolor: "transparent", border: "none" }}>
//         <Table>
//           <TableBody>
//             <TableRow>
//               <TableCell
//                 sx={{
//                   border: "none",
//                 }}
//               >
//                 Customer ID
//               </TableCell>
//               <TableCell
//                 sx={{
//                   border: "none",
//                 }}
//               >
//                 Email
//               </TableCell>
//               <TableCell
//                 sx={{
//                   border: "none",
//                 }}
//               >
//                 Last Interact
//               </TableCell>
//               <TableCell
//                 sx={{
//                   border: "none",
//                 }}
//               >
//                 Timestamp
//               </TableCell>
//               <TableCell
//                 sx={{
//                   border: "none",
//                 }}
//               >
//                 Total TXNS
//               </TableCell>
//             </TableRow>

//             {tabelData.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell
//                   sx={{
//                     border: "none",
//                   }}
//                 >
//                   {item.id}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "none",
//                   }}
//                 >
//                   {item.email}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "none",
//                   }}
//                 >
//                   {item.lastInteract}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "none",
//                   }}
//                 >
//                   {item.timestamp}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     border: "none",
//                   }}
//                 >
//                   {item.totalTxns}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default DataTable;

// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "1rem",
//   }}
// >
//   <Box
//     sx={{
//       display: "flex",
//       //   justifyContent: "space-around",
//       gap: "1rem",
//       alignItems: "center",
//     }}
//   >
//     <Box>
//       <Button
//         label="Show 10"
//         variant="outlined"
//         endIcon={<ArrowUpward />}
//       />
//     </Box>
//     <Typography variant="text-md-regular">
//       Showing 1 to 10 of 552 entries
//     </Typography>
//   </Box>

//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     }}
//   >
//     <Icon icon="minus" />
//     <Button variant="text" label="1" />
//     <Button variant="text" label="2" />
//     <Button variant="text" label="3" />
//     <Icon icon="plus" />
//   </Box>
// </Box>
