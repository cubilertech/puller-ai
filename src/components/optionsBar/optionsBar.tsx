import { Box, Checkbox, Input, Typography } from "@mui/material";
import { FC } from "react";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { CircleOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./optionsBar.css";
import { Divider } from "../Divider";
import { DropdownSelect } from "../DropdownSelect";

interface optionbarProps {
  variant:
    | "input"
    | "square-checkbox"
    | "round-checkbox"
    | "dropdown"
    | "options-dropdown";
  handleUpdate?: () => void | undefined;
  close?: () => void | undefined;
}

const OptionsBar: FC<optionbarProps> = ({ variant, handleUpdate, close }) => {

  const data = [1, 2, 3, 4];

  if (variant === "input")
    return (
        <Box
          sx={{
            width: { lg: "24%", md: "30%", sm: "40%" },
            height: "100%",
            ml: "1rem",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Paper
            type="light-border"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              height: "98.8%",
              justifyContent: "space-between",
              overflow: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                overflow: "auto",
                scrollbarWidth: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography color={"#fff"} variant="text-md-regular">
                  Seasonal Transactions
                </Typography>
                <Box onClick={close}>
                  <CloseIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Typography color={"#fff"} variant="text-sm-regular">
                “TXN_SZNAL” table . This query uses a table
                called Transactions that contains the following columns:
              </Typography>

              <Paper
                type="dark-border"
                sx={{
                  minHeight: "10rem",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  maxHeight: "15rem",
                  margin: 0,
                  border: "2px solid rgba(57, 57, 57, 0.6)",
                }}
              >
                <Input
                  sx={{
                    boxSizing: "border-box",
                    minHeight: "100%",
                    alignItems: "flex-start",
                    overflowY: "auto",
                  }}
                  multiline
                  fullWidth
                  disableUnderline
                  autoFocus
                />
              </Paper>
            </Box>

            <Box>
              <Divider type="light" />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: "1rem",
                }}
              >
                <Button
                  // onClick={handleUpdate}
                  sx={{ height: "38px !important" }}
                  label="Update"
                  variant="contained"
                />
              </Box>
            </Box>
          </Paper>
        </Box>
    );
  else
    return (
      <Box
        sx={{
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper
          type="dark-border"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            minHeight: "calc(100vh - 22vh)",
            justifyContent: "space-between",
          }}
        >
          {(variant === "square-checkbox" || variant === "round-checkbox") && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography color={"#fff"} variant="text-md-regular">
                Data Type
              </Typography>
              <Typography color={"#fff"} variant="text-sm-regular">
                “TXN_SZNAL” table . This query uses a table
                called Transactions that contains the following columns:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {data.map((item, index) => (
                  <Paper
                    key={index}
                    type="light-border"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 0.5rem 0 1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="text-md-regular">Data</Typography>
                    <Checkbox
                      icon={
                        variant === "round-checkbox" ? (
                          <CircleOutlined />
                        ) : undefined
                      }
                      checkedIcon={
                        variant === "round-checkbox" ? (
                          <CheckCircleIcon />
                        ) : undefined
                      }
                    />
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {variant === "dropdown" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography color={"#fff"} variant="text-md-regular">
                Data Type
              </Typography>
              <Typography color={"#fff"} variant="text-sm-regular">
                “TXN_SZNAL” table . This query uses a table
                called Transactions that contains the following columns:
              </Typography>

              <DropdownSelect />
            </Box>
          )}

          {variant === "options-dropdown" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography color={"#fff"} variant="text-md-regular">
                Data Type
              </Typography>
              <Typography color={"#fff"} variant="text-sm-regular">
                “TXN_SZNAL” table . This query uses a table
                called Transactions that contains the following columns:
              </Typography>

              <Box
                mt={"1rem"}
                display={"flex"}
                flexDirection={"column"}
                gap={"10px"}
              >
                <Typography variant="text-sm">And</Typography>
                <DropdownSelect />
                <DropdownSelect />
                <DropdownSelect />
                <Typography variant="text-sm">OR</Typography>
                <DropdownSelect />
                <DropdownSelect />
                <DropdownSelect />
              </Box>
            </Box>
          )}

          <Box>
            <Divider type="light" />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: "1rem",
              }}
            >
              <Button label="Update" variant="contained" />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
};

export default OptionsBar;
