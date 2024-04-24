"use client";
import { Paper } from "@/components/Paper";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ContextMenu from "./contextMenu";
import CloseIcon from "@mui/icons-material/Close";

interface GraphModalProps {
  open: boolean;
  handleClose: () => void;
}

const modalStyle = {
  position: "absolute",
  top: "35%",
  left: "43%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  height: "50vh",
  bgcolor: "transparnet",
  border: "none",
  boxShadow: 24,
};

const GraphModal: FC<GraphModalProps> = ({ open, handleClose }) => {
  const [openUpdateName, setOpenUpdateName] = useState(false);

  const handleCloseUpdateName = () => {
    setOpenUpdateName(!openUpdateName);
  };

  const initialNodes = [
    {
      id: "node-1",
      type: "textUpdater",
      position: { x: 0, y: 0 },
      data: { value: 123, label: "Node 1" },
      variables: [
        {
          id: "var0",
          model: "model0",
          name: "number of top customers",
          type: "int",
          value: 100.0,
        },
      ],
    },
    {
      id: "node-2",
      type: "textUpdater",
      targetPosition: "top",
      position: { x: 0, y: 200 },
      data: { label: "Node 2" },
      variables: [
        {
          id: "var1",
          model: "model1",
          name: "number of top buyers",
          type: "float",
          value: 200.2,
        },
      ],
    },
    {
      id: "node-3",
      type: "textUpdater",
      targetPosition: "top",
      position: { x: 200, y: 200 },
      data: { label: "node 3" },
      variables: [
        {
          id: "var2",
          model: "model2",
          name: "number of top people",
          type: "int",
          value: 300.0,
          a: "b",
          c: "d",
          e: "f",
          g: "h",
          i: "j",
          k: "l",
          m: "n",
        },
      ],
    },
  ];

  const initialEdges = [
    { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
    { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
  ];

  const rfStyle = {
    backgroundColor: "#B8CEFF",
  };

  const route = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeLabelChange = (id: string, label: any) => {
    // Update the label of the node with the given id
    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          variables: label,
        };
      }
      return node;
    });
    // Update the nodes state with the modified nodes array
    setNodes(updatedNodes);
    setMenu(null);
  };

  const onNodeClick = useCallback(
    (event: any, node: any) => {
      const pane = ref?.current?.getBoundingClientRect();
      setMenu({
        id: node.id,
        label: node.data.label,
        variables: node.variables,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
      setOpenUpdateName(true);
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Paper
          type="light-border"
          sx={{
            height: "80vh",
            width: "80vw",
            zIndex: 1,
          }}
        >
          <Box
            zIndex={5}
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: "2%",
              top: "2%",
            }}
          >
            <CloseIcon onClick={() => handleClose()} />
          </Box>
          <ReactFlow
            ref={ref}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />

            {menu && (
              <ContextMenu
                handleNodeLabelChange={handleNodeLabelChange}
                {...menu}
                open={openUpdateName}
                onClose={handleCloseUpdateName}
              />
            )}
          </ReactFlow>
        </Paper>
      </Box>
    </Modal>
  );
};

export default GraphModal;
