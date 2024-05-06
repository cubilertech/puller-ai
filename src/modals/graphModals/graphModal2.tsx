import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
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
// import { initialNodes, initialEdges } from "./nodes-edges";

import "reactflow/dist/style.css";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@/components/Paper";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: any[], edges: any[], direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

interface props {
  open: boolean;
  handleClose: () => void;
  graph: any[];
}

const GraphModal2 = ({ open, handleClose, graph }: props) => {
  // console.log(graph,'graph')
  let initialNodes2 = [];
  let initialEdges2: any[] = [];
  initialNodes2 = graph?.map((item) => {
    return {
      id: item.id,
      // type:'input',
      data: { label: item.name },
      position: position,
    };
  });
  graph?.forEach((item) => {
    item.depends.forEach((dep: any) => {
      initialEdges2.push({
        id: `e${item.id}${dep}`,
        source: item.id,
        target: dep,
        type: edgeType,
        animated: false,
      });
    });
  });

  //   console.log(initialEdges2, "initial Edges");
  //   console.log(initialNodes2, "initial Nodes");

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes2,
    initialEdges2
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );
  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setEdges, setNodes]
  );

  console.log(nodes, "nodes");
  console.log(edges, "edges");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Paper
          variant="light-border"
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
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <Panel position="top-right">
              <button onClick={() => onLayout("TB")}>vertical layout</button>
              <button onClick={() => onLayout("LR")}>horizontal layout</button>
            </Panel>
          </ReactFlow>
        </Paper>
      </Box>
    </Modal>
  );
};

export default GraphModal2;
