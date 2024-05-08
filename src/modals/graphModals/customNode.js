import { Box, Input, Typography } from "@mui/material";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function customNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <Box className="wrapper">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Typography className="node-label">Label: {data.label}</Typography>
      <hr />
      {data?.variables?.length ? (
        <Typography className="variables-label">Variables:</Typography>
      ) : (
        ""
      )}
      <Box className="variables-wrapper">
        {data.variables?.map((item, index) => (
          <Input
            key={index}
            value={item.value}
            name={item.name}
            className="input"
          />
        ))}
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </Box>
  );
}

export default customNode;
