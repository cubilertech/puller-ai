import { PageHeader } from "@/components/PageHeader";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { palette } from "@/theme/Palette";
import { FC, useEffect, useMemo, useState } from "react";
import { List, Prompt } from "@/utils/types";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { AlertModal } from "@/modals/AlertModal";
import "./CreateRequestPage.css";
import { LatestPullsData } from "@/utils/data";
import { PromptList } from "@/components/PromptList";
import { Paper } from "@/components/Paper";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useGetProjectsData } from "@/hooks/useLogin";
import { useRouter, useSearchParams } from "next/navigation";
const DemoMode = isDemoMode;
type DemoMode = typeof isDemoMode;
interface Props {
  list: DemoMode extends true ? Prompt[] : List | null | undefined;
  setRequestQuery: (query: string) => void;
  requestQuery: string;
  handleSubmitPrompt: any;
  submitPromptLoading: boolean;
  handleLatestPrompt: any;
  refetch: () => void;
}
const CreateRequestPage: FC<Props> = ({
  list,
  setRequestQuery,
  requestQuery,
  handleSubmitPrompt,
  submitPromptLoading,
  handleLatestPrompt,
  refetch,
}) => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  // const router = useRouter();
  const [ShowPrompts, setShowPrompts] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  // const [globalLoadings, setGlobalLoadings] = useState(true);
  // const [selectedProjectId, setSelectedProjectId] = useState(
  //   projectId ? projectId : ""
  // );

  // const {
  //   data: ProjectsData,
  //   refetch: refetchProjects,
  //   isFetched: isFetchedProjects,
  //   isFetching,
  // } = useGetProjectsData();
  const promptList = useMemo(() => {
    if (!isDemoMode) {
      if (list && "items" in list) {
        // const uniqueMessages = new Set<string>();
        // const filteredList = list.filter((item) => {
        //   if (!uniqueMessages.has(item.message as string)) {
        //     uniqueMessages.add(item.message as string);
        //     return true;
        //   }
        //   return false;
        // });
        // Return the first 4 items from the filtered list
        return list.items?.slice(0, 4);
      }
      return [];
    }
    return LatestPullsData ? LatestPullsData.slice(0, 4) : [];
  }, [isDemoMode, list, LatestPullsData]);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setSelectedProjectId(event.target.value as string);
  // };

  // const handleChangeProject = (item: any) => {
  //   router.replace(`/request?projectId=${item.id}&orgId=${item.org}`);
  // };

  const handlePrompt = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const handleSource = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  useEffect(() => {
    if (isPilotMode) {
      // refetchProjects();
    } else {
      refetch();
    }
  }, []);

  // useEffect(() => {
  //   if (
  //     !projectId &&
  //     !selectedProjectId &&
  //     isFetchedProjects &&
  //     isPilotMode &&
  //     ProjectsData?.items
  //   ) {
  //     setSelectedProjectId(ProjectsData?.items[0]?.id);
  //     router.push(
  //       `/request?projectId=${ProjectsData?.items[0]?.id}&orgId=${ProjectsData?.items[0]?.org}`
  //     );
  //   }
  //   if (isFetchedProjects) {
  //     setGlobalLoadings(false);
  //   }
  // }, [isFetchedProjects, ProjectsData]);

  const CompanyName = localStorage.getItem("companyName");
  return (
    <>
      <Box sx={{ px: 2, pt: 1, m: "auto" }}>
        <PageHeader
          title="Create a Request"
          buttons={
            isDemoMode
              ? [
                  {
                    label: "Request History",
                    variant: "request-history",
                    href:
                      projectId && orgId
                        ? `/pulls?projectId=${projectId}&orgId=${orgId}`
                        : "/pulls",
                  },
                ]
              : undefined
          }
        />
        <Box
          sx={{
            pt: isPilotMode ? "55px" : 2,
            width: "100%",
            m: "auto",
            height: isPilotMode ? "calc(100vh - 120px)" : "calc(100vh - 150px)",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* {isPilotMode && (
            <>
              {globalLoadings || isFetching ? (
                <Box sx={{ width: "200px", position: "absolute", top: -10 }}>
                  <Skeleton sx={{ width: "50px", mb: -1 }} />
                  <Skeleton sx={{ height: "40px" }} />
                </Box>
              ) : (
                <Box sx={{ position: "absolute", top: -10 }}>
                  <FormControl sx={{ width: "200px" }}>
                    <Typography
                      sx={{ fontSize: "10px", color: "white", pb: 0.6 }}
                    >
                      Projects
                    </Typography>
                    <Select
                      value={selectedProjectId}
                      size="small"
                      onChange={handleChange}
                      renderValue={(value) => {
                        return (
                          <Typography sx={{ textTransform: "capitalize" }}>
                            {value}
                          </Typography>
                        );
                      }}
                    >
                      {ProjectsData?.items?.map((item: any) => (
                        <MenuItem
                          onClick={() => handleChangeProject(item)}
                          value={item?.id}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {item?.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
            </>
          )} */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography className="animated-text animated-left-right-text">
                Hello, {CompanyName ? CompanyName : "Name"}{" "}
              </Typography>
              <Typography
                sx={{
                  color: palette.color.gray[600],
                  fontSize: "50px",
                  fontWeight: 500,
                }}
              >
                Create a pull request to get started
              </Typography>
            </Box>
            <Box>
              <Paper
                onClick={() => setShowPrompts(!ShowPrompts)}
                variant="light-bg-border"
                sx={{
                  display: "flex",
                  gap: 1,
                  width: "fit-content",
                  py: 0.5,
                  px: 1,
                  margin: 0,
                  mb: 2,
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                <Typography variant="text-sm-regular">
                  Recent Prompts
                </Typography>
                <KeyboardArrowDown
                  className={ShowPrompts ? "arrow-up" : "arrow-down"}
                />
              </Paper>
              <Box
                className={ShowPrompts ? "open" : "close"}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  width: "100%",
                  gap: 2,
                  overflow: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {promptList?.map((item, i) => (
                  <PromptList
                    key={`list-${i}`}
                    item={item}
                    index={i}
                    handleLatestPrompt={handleLatestPrompt}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <CreateInputAreaComponent
            handlePrompt={handlePrompt}
            handleSource={handleSource}
            handleValidate={handleSubmitPrompt}
            onChangeInput={(e) => setRequestQuery(e.target.value)}
            isLoading={submitPromptLoading}
            value={requestQuery}
          />
          <AlertModal
            open={isOpenAlert}
            handleClose={() => setIsOpenAlert(false)}
          />
          {/* <PannelArea /> */}
        </Box>
      </Box>
    </>
  );
};

export default CreateRequestPage;
