"use client";
import React, { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Panel,
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
import CustomNode from "./customNode";
import "./customNode.css";
import { Prompt, Variable } from "@/utils/types";
import { Button } from "@/components/Button";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const nodeWidth = 200;
const nodeHeight = 100;

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
  prompt: Prompt;
  validatePrompt: (data: any) => void;
}

const GraphModal2 = ({ open, handleClose, prompt, validatePrompt }: props) => {
  let initialNodes2: any[] = [];
  let initialEdges2: any[] = [];
  const [variables, setVariables] = useState(prompt?.variables ?? []);
  // useEffect(()=>{

  initialNodes2 = prompt?.graph?.map((item, index) => {
    let variable = prompt?.variables.find((_item) => _item.model === item.id);
    return {
      id: item.id,
      // type:'input',
      // data: { label: item.name },
      position: position,
      // position : {
      //   x: position.x - nodeWidth / 2,
      //   y: position.y - nodeHeight / 2,
      // },
      type: "textUpdater",
      data: {
        // label: item.name,
        depends: item.depends,
        description: item.description,
        id: item.id,
        name: item.name,
        variables: variable ? [variable] : [],
      },
    };
  });
  prompt?.graph?.forEach((item) => {
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
  // setNodes(initialNodes2);
  // setEdges(initialEdges2);
  // },[])

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
  // const onLayout = useCallback(
  //   (direction: any) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } =
  //       getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges, setEdges, setNodes]
  // );

  console.log(nodes, "nodes");
  console.log(edges, "edges");

  const handleChange = (id: string, updatedPrompt: any) => {
    const updatedNodes = nodes.map((node) => {
      console.log("Processing node:", node);
      if (node.id == id) {
        console.log("Updating node:", node);
        return {
          ...node,
          data: {
            ...node.data,
            name: updatedPrompt?.name,
            variables: updatedPrompt?.variables,
          },
        };
      } else {
        console.log("Keeping node as is:", node);
        return node;
      }
    });
    const combined: Variable[] = updatedNodes.reduce((acc: any, item) => {
      if (item.data.variables) {
        acc.push(...item.data.variables);
      }
      return acc;
    }, []);

    // console.log(updatedNodes, "updates nodes after variable change");
    setVariables(combined);
    setNodes(updatedNodes);
  };

  const nodeTypes = useMemo(() => {
    return {
      textUpdater: (props: any) => (
        <CustomNode {...props} handleChange={handleChange} />
      ),
    };
  }, []);

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
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <Controls />
            <Panel position="bottom-right">
              <Box>
                <Button
                  variant="contained"
                  label="Submit"
                  onClick={() =>
                    validatePrompt({
                      prompt: prompt?.id,
                      variables: variables,
                    })
                  }
                />
              </Box>
            </Panel>
            <Background />
          </ReactFlow>
        </Paper>
      </Box>
    </Modal>
  );
};

export default GraphModal2;
