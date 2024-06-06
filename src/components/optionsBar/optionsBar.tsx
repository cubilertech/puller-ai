"use client";
import { Box, Checkbox, Input, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { CircleOutlined } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "./optionsBar.css";
import { Divider } from "../Divider";
import { OptionsBarVariants } from "@/utils/types";
import { palette } from "@/theme/Palette";
import { Icon } from "../Icon";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getVariables, updateVariable } from "@/libs/redux/features/variables";
import { setSubmitValidateLoading } from "@/libs/redux/features/globalLoadings";

interface optionbarProps {
  variant: OptionsBarVariants;
  variableId?: string;
  close?: () => void | undefined;
  submitValidate: (data: any) => void;
  PromptId: string;
}

const OptionsBar: FC<optionbarProps> = ({
  variant,
  variableId,
  close,
  submitValidate,
  PromptId,
}) => {
  const dispatch = useAppDispatch();
  const variables = useAppSelector(getVariables);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [selectedItems, setSelectedItems] = useState<string>("");

  const [InputValue, setInputValue] = useState<string | number>("");
  const findVariableById = useMemo(() => {
    const variableById = variables.find(
      (variable) => variable.id === variableId
    );
    if (variableById) {
      setInputValue(variableById?.value);
    }
    return variableById;
  }, [variables, variableId]);

  const HandleInputChange = (value: any) => {
    setInputValue(value);

    dispatch(updateVariable({ id: variableId as string, value: value }));
  };

  useEffect(() => {
    if (findVariableById?.selectData) {
      if (variant === "round-checkbox") {
        const formattedValue = findVariableById?.value
          .toString()
          .replace(/ /g, "");

        const matchIndex = findVariableById.selectData.findIndex(
          (item) => item?.replace(/ /g, "") === formattedValue
        );
       
        const initialCheckedItems = findVariableById.selectData.map(
          (_, index) => index === (matchIndex !== -1 ? matchIndex : 0)
        );

        setCheckedItems(initialCheckedItems);
        setSelectedItems(
          findVariableById.selectData[matchIndex !== -1 ? matchIndex : 0]
        );
      } else {
        const initialCheckedItems = findVariableById.selectData.map(() => true);
        setCheckedItems(initialCheckedItems);
      }
    }
  }, [variant]);

  useEffect(() => {
    if (findVariableById?.selectData) {
      const updatedSelectedItems = findVariableById.selectData
        .filter((_, index) => checkedItems[index])
        .map((item) => item + " ")
        .join("");
      setSelectedItems(updatedSelectedItems);
      dispatch(
        updateVariable({
          id: variableId as string,
          value: updatedSelectedItems,
        })
      );
    }
  }, [checkedItems, findVariableById]);

  const handleSquareCheckboxClick = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  const handleRoundCheckboxClick = (item: string, index: number) => {
    if (findVariableById?.selectData) {
      const updatedCheckedItems = findVariableById.selectData.map(
        (_, i) => i === index
      );
      setCheckedItems(updatedCheckedItems);
      setSelectedItems(item + " ");
    }
  };

  const renderCheckboxes = () => {
    if (findVariableById?.selectData) {
      return findVariableById?.selectData.map((item: string, index: number) => (
        <label
          key={index}
          onClick={() => {
            variant === "round-checkbox"
              ? handleRoundCheckboxClick(item, index)
              : handleSquareCheckboxClick(index);
          }}
        >
          <Paper
            variant="light-border"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 0.5rem 0 1rem",
              borderRadius: "5px",
            }}
          >
            <Typography variant="text-md-regular">{item}</Typography>
            <Checkbox
              checked={!!checkedItems[index]}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              icon={
                variant === "round-checkbox" ? <CircleOutlined /> : undefined
              }
              checkedIcon={
                variant === "round-checkbox" ? (
                  <Icon icon="roundCheckbox" width={18} height={18} />
                ) : (
                  <Icon icon="squareCheckbox" width={18} height={18} />
                )
              }
            />
          </Paper>
        </label>
      ));
    }
  };


  const handleUpdate = () => {
    if (PromptId) {
      submitValidate({ prompt: PromptId, variables: variables });
      dispatch(setSubmitValidateLoading(true));
    }
  };

  switch (variant) {
    case "input":
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
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
              minHeight: "calc(100vh - 195px)",
              justifyContent: "space-between",
              m: 0,
              ml: 0.5,
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
                <Typography
                  color={palette.base.white}
                  variant="text-md-regular"
                >
                  Swap Variable
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
                {findVariableById?.description
                  ? findVariableById.description
                  : "Enter any number you want to update"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "calc(100vh - 365px)",
                }}
              >
                {findVariableById?.type === "numeric" ? (
                  <Input
                    disableUnderline
                    fullWidth
                    type="number"
                    onChange={(e) => HandleInputChange(e.target.value)}
                    value={InputValue}
                    placeholder="Enter Number you want to update"
                    sx={{
                      borderRadius: "5px",
                      padding: "0.5rem 1rem",
                      border: "2px solid rgba(196, 196, 196, 0.6)",
                      mt: 0.5,
                      width: "100%",
                    }}
                  />
                ) : (
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
                      onChange={(e) => HandleInputChange(e.target.value)}
                      sx={{
                        boxSizing: "border-box",
                        minHeight: "100%",
                        alignItems: "flex-start",
                        overflowY: "auto",
                      }}
                      value={InputValue}
                      multiline
                      fullWidth
                      disableUnderline
                      autoFocus
                    />
                  </Paper>
                )}
              </Box>
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
                  // disabled={selectedItems === "" ? true : false}
                  onClick={handleUpdate}
                  sx={{ height: "38px !important" }}
                  label="Update"
                  variant="contained"
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      );
    case "square-checkbox":
    case "round-checkbox":
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
              minHeight: "calc(100vh - 195px)",
              justifyContent: "space-between",
              m: 0,
              ml: 0.5,
            }}
          >
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
                Swap Variable{" "}
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
                {findVariableById?.description
                  ? findVariableById.description
                  : "Please select any of the given data"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  height: "calc(100vh - 380px)",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {renderCheckboxes()}
              </Box>
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
                  disabled={selectedItems === "" ? true : false}
                  onClick={handleUpdate}
                  sx={{ height: "38px !important" }}
                  label="Update"
                  variant="contained"
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      );
  }
};

export default OptionsBar;

// else
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//     >
//       <Paper
//         variant="dark-border"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "1rem",
//           minHeight: "calc(100vh - 200px)",
//           justifyContent: "space-between",
//         }}
//       >
//         {(variant === "square-checkbox" || variant === "round-checkbox") && (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//             }}
//           >
//             <Typography
//               color={palette.base.white}
//               variant="text-md-regular"
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               Data Type{" "}
//               <Box onClick={close}>
//                 <CloseIcon
//                   sx={{
//                     ":hover": {
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//             </Typography>
//             <Typography color={palette.base.white} variant="text-sm-regular">
//               “TXN_SZNAL” table . This query uses a table
//               called Transactions that contains the following columns:
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//               }}
//             >
//               {OPTIONBAR_DATA.map((item, index) => (
//                 <label
//                   key={index}
//                   onClick={() => handleItemClick(item, index)}
//                 >
//                   <Paper
//                     variant="light-border"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       padding: "0 0.5rem 0 1rem",
//                       borderRadius: "5px",
//                     }}
//                   >
//                     <Typography variant="text-md-regular">{item}</Typography>
//                     <Checkbox
//                       checked={!!checkedItems[index]}
//                       sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
//                       icon={
//                         variant === "round-checkbox" ? (
//                           <CircleOutlined />
//                         ) : undefined
//                       }
//                       checkedIcon={
//                         variant === "round-checkbox" ? (
//                           <Icon icon="roundCheckbox" width={18} height={18} />
//                         ) : (
//                           <Icon
//                             icon="squareCheckbox"
//                             width={18}
//                             height={18}
//                           />
//                         )
//                       }
//                     />
//                   </Paper>
//                 </label>
//               ))}
//             </Box>
//           </Box>
//         )}

//         {variant === "dropdown" && (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//             }}
//           >
//             <Typography
//               color={palette.base.white}
//               variant="text-md-regular"
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               Data Type{" "}
//               <Box onClick={close}>
//                 <CloseIcon
//                   sx={{
//                     ":hover": {
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//             </Typography>
//             <Typography color={palette.base.white} variant="text-sm-regular">
//               “TXN_SZNAL” table . This query uses a table
//               called Transactions that contains the following columns:
//             </Typography>

//             <DropdownSelect />
//           </Box>
//         )}

//         {variant === "options-dropdown" && (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: "1rem",
//             }}
//           >
//             <Typography
//               color={palette.base.white}
//               variant="text-md-regular"
//               sx={{ display: "flex", justifyContent: "space-between" }}
//             >
//               Data Type{" "}
//               <Box onClick={close}>
//                 <CloseIcon
//                   sx={{
//                     ":hover": {
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//             </Typography>
//             <Typography color={palette.base.white} variant="text-sm-regular">
//               “TXN_SZNAL” table . This query uses a table
//               called Transactions that contains the following columns:
//             </Typography>

//             <Box
//               mt={"1rem"}
//               display={"flex"}
//               flexDirection={"column"}
//               gap={"10px"}
//             >
//               <Typography variant="text-sm">And</Typography>
//               <DropdownSelect />
//               <DropdownSelect />
//               <DropdownSelect />
//               <Typography variant="text-sm">OR</Typography>
//               <DropdownSelect />
//               <DropdownSelect />
//               <DropdownSelect />
//             </Box>
//           </Box>
//         )}

//         <Box>
//           <Divider type="light" />
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               mt: "1rem",
//             }}
//           >
//             <Button
//               label="Update"
//               variant="contained"
//               onClick={() => handleUpdateVariable()}
//             />
//           </Box>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default OptionsBar;
