import { palette } from "@/theme/Palette";
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Paper } from "../Paper";
import "./responseArea.css";
import { Prompt, UpdateVariables } from "@/utils/types";
import {
  getFormatedDescription,
  replaceBrandName,
  replaceIdWithVariable,
} from "@/utils/common";
import { useAppSelector } from "@/libs/redux/hooks";
import {
  getIsLoadingRequest,
  getPromptValue,
} from "@/libs/redux/features/isLoadingRequest";
import { Button } from "../Button";
import { useGetResponseTableData, useGetSinglePrompt } from "@/hooks/usePrompt";
import { useEdges } from "reactflow";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { DataTable as DataTableDemo } from "../table";
import DataTable from "./responseTable";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Loader } from "../Loader";

interface ResponseAreaProps {
  prompt?: Prompt;
  handleUpdate?: (value: UpdateVariables) => void;
  isLoading?: boolean;
  handleMouseUp: () => void;
  isEditingText?: boolean;
  textSelected?: string;
  indiceStart?: number;
  indiceEnd?: number;
  handleUpdateQuery?: () => void;
}

const ResponseArea: FC<ResponseAreaProps> = ({
  prompt,
  handleUpdate,
  isLoading,
  handleMouseUp,
  isEditingText,
  textSelected,
  indiceStart,
  indiceEnd,
  handleUpdateQuery,
}) => {
  const companyName = localStorage.getItem("companyName");
  const SelectedVariableId = localStorage.getItem("variableId");
  const isLoadingPage = useAppSelector(getIsLoadingRequest);
  const PromptValue = useAppSelector(getPromptValue);
  const replaceBrand = replaceBrandName(
    { description: PromptValue },
    companyName as string
  );
  const [ShowQuery, setShowQuery] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const DemoApi = useGetSinglePrompt(
    CURRENT_MODE === MODES.DEMO
      ? (prompt?.id?.substring(6) as string)
      : (prompt?.id as string)
  );

  const PilotApi = useGetResponseTableData(prompt?.id as string);

  // Select the appropriate API hook based on the mode
  const selectedApi = CURRENT_MODE !== MODES.DEMO ? PilotApi : DemoApi;

  // Destructure common properties
  const {
    data: TableData,
    isLoading: isLoadingTableData,
    isSuccess: isPreviewDataSucess,
  } = selectedApi;

  // Check if `selectedApi` is a mutation or query to access specific functions
  const GetResponseTableData =
    "mutate" in selectedApi ? selectedApi.mutate : undefined;
  const reftchTableData =
    "refetch" in selectedApi ? selectedApi.refetch : undefined;

  // Determine the function to use based on the mode
  const fetchOrMutate =
    CURRENT_MODE !== MODES.DEMO ? GetResponseTableData : reftchTableData;

  const responseTxt = useMemo(() => {
    const handleClickVariable = (value: UpdateVariables) => {
      // Perform action when a variable value is clicked
      if (handleUpdate) {
        handleUpdate(value);
      }
    };

    return replaceIdWithVariable(
      prompt as Prompt,
      handleClickVariable,
      companyName as string
    );
  }, [prompt, SelectedVariableId]);

  const FormatedDescription = useMemo(() => {
    return getFormatedDescription(prompt as Prompt);
  }, [isEditingText]);

  const [isMultiLine, setIsMultiLine] = useState(false);
  // const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      const container = textRef.current;
      // Get the height of the text container
      const containerHeight = container.clientHeight;
      const sroleHeiht = container.scrollHeight;

      setIsMultiLine(sroleHeiht > containerHeight);
    }
  }, [prompt]);

  useEffect(() => {
    if (fetchOrMutate && prompt?.id) {
      if (typeof fetchOrMutate === "function") {
        // Check if it's a mutation function (which requires specific arguments)
        if (CURRENT_MODE !== MODES.DEMO && "mutate" in selectedApi) {
          (fetchOrMutate as typeof selectedApi.mutate)(); // Call mutate without any arguments
        }
        // Check if it's a refetch function (which doesn't require arguments)
        else if ("refetch" in selectedApi) {
          (fetchOrMutate as typeof selectedApi.refetch)(); // Call refetch
        }
      }
    }
  }, [fetchOrMutate, prompt?.id]);

  useEffect(() => {
    if (isPreviewDataSucess) {
      setIsPreviewLoading(false);
    } else setIsPreviewLoading(true);
  }, [isPreviewDataSucess]);
  const iconStyles = {
    transform: ShowQuery ? "rotate(0deg)" : "rotate(180deg)",
    animation: ShowQuery
      ? "rotateUp 0.2s ease-in-out"
      : "rotateDown 0.2s ease-in-out",
    transition: "transform 0.2s ease-in-out",
  };
  return (
    <>
      {/* response description */}
      <Box
        sx={{
          height: "calc(100vh - 160px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Paper
          variant="dark-border"
          sx={{
            border: `1px solid ${palette.color.gray[700]}`,
            height: "50%",
            padding: 1.2,
            gap: 1,
            m: 0,
            mt: 1,
            minHeight: "200px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "flex-start",
              mt: 1,
              // pb: "42px",
              height: { lg: ShowQuery ? "60%" : "76%", xs: "60%" },
              overflow: "auto",
              scrollbarWidth: "none",
              mb: 2,
            }}
          >
            {isLoading ? (
              <>
                <pre
                  style={{
                    width: "100%",
                    paddingRight: 50,
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "start",
                  }}
                >
                  <Skeleton
                    style={{ width: "100%", margin: "0", height: 32 }}
                  />
                  <Skeleton
                    style={{ width: "100%", margin: "0", height: 32 }}
                  />
                  <Skeleton style={{ width: "80%", margin: "0", height: 32 }} />
                </pre>
              </>
            ) : (
              <Typography
                variant="display-xs-response"
                sx={{
                  width: "98%",
                  pr: 5,
                  mx: "auto",
                  textAlign: "start",
                  color: palette.base.white,
                }}
                component="div"
                className="animated-genrated-text"
                onMouseUp={isEditingText ? () => {} : handleMouseUp}
              >
                {isEditingText ? (
                  <>
                    {FormatedDescription?.slice(0, indiceStart ?? 0)}
                    <span style={{ background: "#7a8089" }}>
                      {textSelected}
                    </span>
                    {FormatedDescription?.slice(indiceEnd ?? 0)}
                  </>
                ) : (
                  responseTxt
                )}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              height: ShowQuery ? "110px" : "50px",
            }}
            // className={ShowQuery ? "expand-height-container" : "collapse-height-container"}
          >
            <Box
              sx={{
                p: 1,
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                border: "1px solid #969696",
                borderRadius: "10px",
                boxShadow: 10,
                width: "100%",
                height: "fit-content",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="text-xs-bold">Orignial</Typography>
                {isLoading || isLoadingPage ? (
                  <Skeleton
                    style={{
                      width: "90%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                ) : (
                  <Typography
                    className={`animated-genrated-text transparent-scrollbar ${ShowQuery ? "expand-height" : "collapse-height"}`}
                    variant="text-sm-regular"
                    color={palette.color.gray[175]}
                    ref={textRef}
                    sx={
                      !isMultiLine
                        ? { height: "auto !important" }
                        : { scrollbarWidth: "none" }
                    }
                    component={"span"}
                    // sx={ShowQuery ? styles.open : styles.closed}
                  >
                    {replaceBrand ? replaceBrand : prompt?.message}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                {isMultiLine && (
                  <IconButton
                    sx={{
                      backgroundColor: "none",
                      border: "none",
                      background: "none",
                      padding: 1,
                      borderRadius: "100%",
                      justifySelf: "flex-end",
                    }}
                    onClick={() => setShowQuery(!ShowQuery)}
                  >
                    <KeyboardArrowDown sx={iconStyles} />
                  </IconButton>
                )}
                <Box sx={{ width: "122px", position: "relative" }}>
                  <Button
                    sx={{
                      width: "122px",
                      height: "38px !important",
                    }}
                    disabled={isLoading ? isLoading : isLoadingPage}
                    onClick={handleUpdateQuery}
                    label="Run Query"
                    variant="contained"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper
          variant="dark-border"
          sx={{
            border: `1px solid ${palette.color.gray[700]}`,
            height: "50%",
            padding: 1.2,
            gap: 1,
            m: 0,
          }}
        >
          {" "}
          <Box
            sx={{ height: "100%", overflow: "auto", scrollbarWidth: "none" }}
          >
            {isPreviewLoading ? (
              <Box
                sx={{
                  minHeight: "240px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {/* <Loader type="Loading" variant="simple"  message="Fetching Data" /> */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                  <Typography
                    sx={{ color: palette.color.gray[250], textAlign: "center" }}
                  >
                    Fetching Data...
                  </Typography>
                </Box>
              </Box>
            ) : CURRENT_MODE === MODES.DEMO && TableData ? (
              <Box>
                <DataTableDemo data={TableData as Prompt} isFilter />
              </Box>
            ) : (
              <DataTable data={TableData} />
            )}
          </Box>
        </Paper>
      </Box>
    </>
  );
};
export default ResponseArea;
