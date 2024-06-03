"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
// import { initialNodes, initialEdges } from "./nodes-edges";

import "reactflow/dist/style.css";
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@/components/Paper";
import CustomNode from "./customNode";
import "./customNode.css";
import { Prompt, Variable } from "@/utils/types";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { setSubmitValidateLoading } from "@/libs/redux/features/globalLoadings";
import { useAppDispatch } from "@/libs/redux/hooks";
import { palette } from "@/theme/Palette";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const nodeWidth = 200;
const nodeHeight = 200;

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
  prompt: Prompt;
  validatePrompt: (data: any) => void;
}

const getNodes = (prompt: Prompt) => {
  const result = prompt?.graph?.map((item, index) => {
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
  return result ?? [];
};
const getEdges = (prompt: Prompt) => {
  const result: any[] = [];
  prompt?.graph?.forEach((item) => {
    item.depends.forEach((dep: any) => {
      result.push({
        id: `e${item.id}${dep}`,
        source: item.id,
        target: dep,
        type: edgeType,
        animated: false,
      });
    });
  });
  return result ?? [];
};

const GraphModal2 = ({ prompt, validatePrompt }: props) => {
  // let initialNodes2: any[] = [];
  // let initialEdges2: any[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const [variables, setVariables] = useState(prompt?.variables ?? []);
  const variablesInitialArray = prompt?.variables ?? [];
  const [isDirty, setIsDirty] = useState(false);

  const dispatch = useAppDispatch();
  // useEffect(()=>{

  const initialNodes2 = getNodes(prompt);
  const initialEdges2 = getEdges(prompt);

  useEffect(() => {
    setTimeout(() => {
      setNodes(initialNodes2);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  // console.log(nodes, "nodes");
  // console.log(edges, "edges");

  const handleChange = (id: string, updatedPrompt: any) => {
    const updatedNodes = nodes.map((node) => {
      // console.log("Processing node:", node);
      if (node.id == id) {
        // console.log("Updating node:", node);
        return {
          ...node,
          data: {
            ...node.data,
            name: updatedPrompt?.name,
            variables: updatedPrompt?.variables,
          },
        };
      } else {
        // console.log("Keeping node as is:", node);
        return node;
      }
    });
    // const combined: Variable[] = updatedNodes.reduce((acc: any, item) => {
    //   if (item.data.variables) {
    //     acc.push(...item.data.variables);
    //   }
    //   return acc;
    // }, []);
    const newArray = variables;
    const index = newArray.findIndex((item) => item.model === updatedPrompt.id);
    if (index >= 0) {
      newArray[index].value = Number(updatedPrompt.variables?.[0]?.value);
    }

    setVariables([...newArray]);
    setNodes(updatedNodes);
    setIsDirty(true);
  };

  const handleSubmit = () => {
    validatePrompt({
      prompt: prompt?.id,
      variables: variables,
    });
    dispatch(setSubmitValidateLoading(true));
  };

  const nodeTypes = useMemo(() => {
    return {
      textUpdater: (props: any) => (
        <CustomNode {...props} handleChange={handleChange} />
      ),
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 298px)" }}>
      <Paper
        variant="dark-border"
        sx={{
          height: "100%",
          width: "100%",
          zIndex: 1,
          m: 0,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Loader variant="simple" type="Loading" />
          </Box>
        ) : prompt.graph && prompt.graph.length ? (
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
            {isDirty && (
              <Panel position="bottom-right">
                <Button
                  variant="contained"
                  label="Save Changes"
                  onClick={handleSubmit}
                />
              </Panel>
            )}
            <Background />
          </ReactFlow>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Typography
              variant="text-lg-regular"
              color={palette.color.gray[500]}
            >
              No Graph Found
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default GraphModal2;
