"use client";
import { Box, Checkbox, Input, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { CircleOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "./optionsBar.css";
import DropdownSelect from "../DropdownSelect/dropdownSelect";
import { Divider } from "../Divider";
import { OptionsBarVariants } from "@/utils/types";
import { palette } from "@/theme/Palette";
import { Icon } from "../Icon";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { updateValue } from "@/libs/redux/features/validateRequest";
import { HandleCloseOptionbar } from "@/libs/redux/features/sqlEditor";
import { toggleCheckbox } from "@/libs/redux/features/checkbox";
import { OPTIONBAR_DATA } from "@/utils/constants";

interface optionbarProps {
  variant: OptionsBarVariants;
  handleUpdate?: () => void | undefined;
  close?: () => void | undefined;
}

const OptionsBar: FC<optionbarProps> = ({ variant, handleUpdate, close }) => {
  const dispatch = useAppDispatch();

  const checkedItems = useAppSelector((state: any) => state.checkbox);
  const [selectedItems, setSelectedItems] = useState("");

  useEffect(() => {
    // Update selectedItems whenever checkedItems change
    const updatedSelectedItems = OPTIONBAR_DATA.filter(
      (_, index) => checkedItems[index]
    )
      .map((item) => item + " ")
      .join("");
    setSelectedItems(updatedSelectedItems);
  }, [checkedItems]);

  const handleItemClick = (item: string, index: number) => {
    // Check if the item is already selected
    let updatedSelectedItems;
    if (selectedItems.includes(item)) {
      // If selected, remove it from the selected items string
      updatedSelectedItems = selectedItems.replace(`${item} `, "");
    } else {
      // If not selected, add it to the selected items string
      updatedSelectedItems = selectedItems + `${item} `;
    }
    setSelectedItems(updatedSelectedItems);
    // Toggle checkbox state
    dispatch(toggleCheckbox({ index }));
  };

  const handleUpdateVariable = () => {
    dispatch(updateValue(selectedItems));
    dispatch(HandleCloseOptionbar());
  };

  if (variant === "input")
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          ml: "1rem",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Paper
          variant="light-border"
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
              <Typography color={palette.base.white} variant="text-md-regular">
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
            <Typography color={palette.base.white} variant="text-sm-regular">
              “TXN_SZNAL” table . This query uses a table
              called Transactions that contains the following columns:
            </Typography>

            <Paper
              variant="dark-border"
              sx={{
                minHeight: "10rem",
                padding: "0.5rem 1rem",
                display: "flex",
                maxHeight: "15rem",
                margin: 0,
                border: `2px solid ${palette.opacity.darkerGray}`,
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper
          variant="dark-border"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            minHeight: "calc(100vh - 200px)",
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
              <Typography
                color={palette.base.white}
                variant="text-md-regular"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                Data Type{" "}
                <Box onClick={close}>
                  <CloseIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </Typography>
              <Typography color={palette.base.white} variant="text-sm-regular">
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
                {OPTIONBAR_DATA.map((item, index) => (
                  <label
                    key={index}
                    onClick={() => handleItemClick(item, index)}
                  >
                    <Paper
                      variant="light-border"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 0.5rem 0 1rem",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography variant="text-md-regular">{item}</Typography>
                      <Checkbox
                        checked={!!checkedItems[index]}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                        icon={
                          variant === "round-checkbox" ? (
                            <CircleOutlined />
                          ) : undefined
                        }
                        checkedIcon={
                          variant === "round-checkbox" ? (
                            <Icon icon="roundCheckbox" width={18} height={18} />
                          ) : (
                            <Icon
                              icon="squareCheckbox"
                              width={18}
                              height={18}
                            />
                          )
                        }
                      />
                    </Paper>
                  </label>
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
              <Typography
                color={palette.base.white}
                variant="text-md-regular"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                Data Type{" "}
                <Box onClick={close}>
                  <CloseIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </Typography>
              <Typography color={palette.base.white} variant="text-sm-regular">
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
              <Typography
                color={palette.base.white}
                variant="text-md-regular"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                Data Type{" "}
                <Box onClick={close}>
                  <CloseIcon
                    sx={{
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </Typography>
              <Typography color={palette.base.white} variant="text-sm-regular">
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
              <Button
                label="Update"
                variant="contained"
                onClick={() => handleUpdateVariable()}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
};

export default OptionsBar;
