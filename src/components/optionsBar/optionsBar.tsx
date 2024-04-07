import {
  Box,
  Checkbox,
  Divider,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Paper } from "../Paper";
import { InputArea } from "../inputArea";
import { Button } from "../Button";
import { CircleNotifications, CircleOutlined } from "@mui/icons-material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface optionbarProps {
  variant:
    | "input"
    | "square-checkbox"
    | "round-checkbox"
    | "dropdown"
    | "options-dropdown";
}

const OptionsBar: FC<optionbarProps> = ({ variant }) => {
  if (variant === "input")
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography color={"#fff"} variant="text-md-regular">
              Seasonal Transactions
            </Typography>
            <Typography color={"#fff"} variant="text-sm-regular">
              “TXN_SZNAL” table . This query uses a table
              called Transactions that contains the following columns:
            </Typography>

            <Paper
              type="dark-border"
              sx={{
                minHeight: "10rem",
                padding: "1rem",
                margin: 0,
              }}
            >
              <Input multiline fullWidth disableUnderline />
            </Paper>
          </Box>

          <Box>
            <Divider />
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
  //   if (variant === "square-checkbox" || variant === "round-checkbox" ||)
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
                <Paper
                  type="light-border"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem 0 1rem",
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
                <Paper
                  type="light-border"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem 0 1rem",
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
                <Paper
                  type="light-border"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem 0 1rem",
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
                <Paper
                  type="light-border"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.5rem 0 1rem",
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
              </Box>
            </Box>
          )}

          {variant === "dropdown" && (
            <Box>
              <Paper
                type="light-border"
                sx={{
                  padding: "3px",
                }}
              >
                <Select
                  placeholder="Data asdsd"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="standard"
                  label="Age"
                  fullWidth
                  disableUnderline
                  sx={{
                    border: "none", // Remove borders
                    bgcolor: "transparent", // Set transparent background color
                    "&:focus": {
                      // Remove focus outline
                      bgcolor: "transparent",
                    },
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    padding: " 0 10px",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Paper>
            </Box>
          )}

          {variant === "options-dropdown" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Paper
                type="light-border"
                sx={{
                  padding: "3px",
                }}
              >
                <Select
                  placeholder="Data asdsd"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="standard"
                  label="Age"
                  fullWidth
                  disableUnderline
                  sx={{
                    border: "none", // Remove borders
                    bgcolor: "transparent", // Set transparent background color
                    "&:focus": {
                      // Remove focus outline
                      bgcolor: "transparent",
                    },
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    padding: " 0 10px",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Paper>
              <Paper
                type="light-border"
                sx={{
                  padding: "3px",
                }}
              >
                <Select
                  placeholder="Data asdsd"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="standard"
                  label="Age"
                  fullWidth
                  disableUnderline
                  sx={{
                    border: "none", // Remove borders
                    bgcolor: "transparent", // Set transparent background color
                    "&:focus": {
                      // Remove focus outline
                      bgcolor: "transparent",
                    },
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    padding: " 0 10px",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Paper>
              <Paper
                type="light-border"
                sx={{
                  padding: "3px",
                }}
              >
                <Select
                  placeholder="Data asdsd"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="standard"
                  label="Age"
                  fullWidth
                  disableUnderline
                  sx={{
                    border: "none", // Remove borders
                    bgcolor: "transparent", // Set transparent background color
                    "&:focus": {
                      // Remove focus outline
                      bgcolor: "transparent",
                    },
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    padding: " 0 10px",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Paper>
            </Box>
          )}

          <Box>
            <Divider />
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
