"use client";
import { Box, Input } from "@mui/material";
import { Paper } from "../../components/Paper";
import React, { useCallback, useRef, useState, FC } from "react";
import { useRouter } from "next/navigation";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import ContextMenu from "./contextMenu";
interface PanelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
}

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123, label: "Node 1" },
  },
  {
    id: "node-2",
    type: "textUpdater",
    targetPosition: "top",
    position: { x: 0, y: 200 },
    data: { label: "Node 2" },
  },
  {
    id: "node-3",
    type: "textUpdater",
    targetPosition: "top",
    position: { x: 200, y: 200 },
    data: { label: "node 3" },
  },
];

const initialEdges = [
  { id: "edge-1", source: "node-1", target: "node-2", sourceHandle: "a" },
  { id: "edge-2", source: "node-1", target: "node-3", sourceHandle: "b" },
];

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const PanelArea: FC<PanelAreaProps> = ({ content, handleUpdate }) => {
  const route = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleNodeLabelChange = (id: string, label: string) => {
    // Update the label of the node with the given id
    const updatedNodes = nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: {
            ...node.data,
            label: label,
          },
        };
      }
      return node;
    });
    // Update the nodes state with the modified nodes array
    setNodes(updatedNodes);
    setMenu(null);
  };

  const onLabelChange = (id: string, label: string) => {
    // handleNodeLabe ge(id, label);
  };

  const onNodeClick = useCallback(
    (event, node) => {
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        label: node.data.label,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: "calc(100vh - 200px)",
          width: "100%",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "flex-end",
            flexGrow: "1",
          }}
        >
          <Paper
            type="dark-border"
            sx={{
              border: "1px solid rgb(52,51,65)",
              height: content ? "fit-content" : "100%",
              margin: 0,
              padding: content ? 1 : 0,
              width: "100%",
            }}
          >
            <ReactFlow
              ref={ref}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              // onPaneClick={onPaneClick}
              // onNodeContextMenu={onNodeContextMenu}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background />
              {menu && (
                <ContextMenu
                  handleNodeLabelChange={handleNodeLabelChange}
                  {...menu}
                />
              )}
            </ReactFlow>
          </Paper>
        </Box>
        <Paper type="light-border">
          <Box
            sx={{
              padding: "8px",
            }}
          >
            <Box
              sx={{
                marginBottom: "0.5rem",
              }}
            >
              <Paper
                type="dark-border"
                sx={{
                  padding: "0.5rem ",
                  margin: 0,
                  minHeight: "5rem",
                  display: "flex",
                  maxHeight: "15rem",
                }}
              >
                {/* <textarea
                  value={nodes.map((item) => JSON.stringify(item)).join("\n")}
                  onChange={updateGraphNodes}
                  placeholder="Enter array elements..."
                  rows={10}
                  cols={50}
                /> */}
              </Paper>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "8px",
            }}
          >
            <Box
              sx={{
                marginBottom: "0.5rem",
              }}
            >
              <Paper
                type="dark-border"
                sx={{
                  padding: "0.5rem ",
                  margin: 0,
                  minHeight: "5rem",
                  display: "flex",
                  maxHeight: "15rem",
                }}
              >
                <Input
                  multiline
                  fullWidth
                  disableUnderline
                  placeholder="Graph edges"
                  sx={{
                    boxSizing: "border-box",
                    minHeight: "100%",
                    alignItems: "flex-start",
                    overflowY: "auto",
                  }}
                />
              </Paper>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default PanelArea;
