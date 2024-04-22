import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useState } from "react";

const handleStyle = { left: 10 };

function TextUpdaterNode({ id, data, isConnectable , onLabelChange }) {
  const [value, setValue] = useState(data?.label || ""); 
  const onChange = (evt) => {
    const newValue = evt.target.value;
    setValue(newValue);
    onLabelChange(id, newValue);
  };


  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <input id="text" name="text" onChange={onChange} className="nodrag" defaultValue={data.label} value={value} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
