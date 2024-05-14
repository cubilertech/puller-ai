import { Graph, Variable } from "@/utils/types";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Handle, Position } from "reactflow";
import CheckIcon from "@mui/icons-material/Check";
const handleStyle = { left: 10 };

type Data = Graph & { variables: Variable[] };

interface Props {
  data: Data;
  isConnectable: boolean;
  handleChange: (id: string, prompt: any) => void;
}
const CustomNode: FC<Props> = ({ data, isConnectable, handleChange }) => {
  const [prompt, setPrompt] = useState(data);

  // const onNameChange = (evt: any) => {
  //   const newValue = evt.target.value;
  //   setPrompt((prev) => ({ ...prev, name: newValue }));
  //   handleChange(data?.id, { ...prompt, name: newValue });
  // };
  const onVariableChange = (id: string, newValue: string) => {
    const vars = prompt?.variables?.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          value: newValue,
        };
      } else {
        return item;
      }
    });
    setPrompt({ ...prompt, variables: vars });
    handleChange(data?.id, { ...prompt, variables: vars });
  };

  return (
    <Box className="wrapper">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box className="table-name-wrapper">
        <Typography className="table-heading">Table:</Typography>
        {/* <Input
        key={`node-${prompt?.name}`}
        type="text"
        value={prompt?.name}
        id={prompt?.id}
        name={prompt?.name}
        className="input"
        // label={data?.name ?? 'input'}
        // variant="outlined"
        onChange={onNameChange}
      /> */}
        <Typography className="table-name">{prompt?.name}</Typography>
        <IconButton
          disabled={true}
          className="edit-icon-button"
          sx={{
            "&:hover": {
              background: "#757575",
            },
          }}
        >
          {" "}
          <CheckIcon sx={{ fontSize: "12px" }} />{" "}
        </IconButton>
      </Box>

      <Typography className="desc">{prompt?.description}</Typography>
      {data?.variables?.length ? (
        <Typography className="variables-label">Variables:</Typography>
      ) : (
        ""
      )}
      <Box className="variables-wrapper">
        {prompt?.variables?.map((item: any, index: number) => (
          <Box
            className="variable-item"
            key={`${prompt?.id}-variable-wrapper-${index++}`}
          >
            <Typography
              key={`${prompt?.id}-variable-name-${index++}`}
              className="variable-item-name"
            >
              {item?.name}
            </Typography>
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  color: "black", // Change this to your desired label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "red", // Change this to your desired border color
                  },
                  "& input": {
                    color: "black", // Change this to your desired input text color
                    padding: "4px", // Change this to your desired input padding
                    fontSize: "10px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black", // Change this to your desired border color
                  },
                  "&:hover": {
                    "& fieldset": {
                      borderColor: "black", // Border color on hover
                    },
                    "& .MuiInputLabel-root": {
                      color: "black", // Label color on hover
                      padding: "4px",
                      height: "25px",
                    },
                    "& input": {
                      color: "black", // Text color on hover
                    },
                  },
                  "&:focus-within": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black", // Border color on focus
                    },
                  },
                  height: "25px", // Change this to your desired input height
                },
              }}
              type={item.type === "numeric" ? "number" : "text"}
              key={`${prompt?.id}-variable-value-${index++}`}
              value={item.value}
              id={item?.id}
              name={item?.name}
              className="variable-item-input"
              onChange={(event) =>
                onVariableChange(item?.id, event.target.value)
              }
              // label={item?.name}
              variant="outlined"
            />
          </Box>
        ))}
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </Box>
  );
};

export default CustomNode;
