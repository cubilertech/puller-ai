"use client";
import { palette } from "@/theme/Palette";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from "@mui/material";
import { Icon } from "../Icon";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { PagesType, isClient, isPilotMode } from "@/utils/constants";
import CustomLink from "../Link/link";
import NotificationIconButton from "@/common/notificationIconButton/notificationIconButton";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import { AlertModal } from "@/modals/AlertModal";
import { useEffect, useState } from "react";
import { useGetProjectsData } from "@/hooks/useLogin";

const TopNavBar = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const route = usePathname();
  const currentPath = isClient ? window.location.pathname : "";
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(
    projectId ? projectId : ""
  );
  const [globalLoadings, setGlobalLoadings] = useState(
    !projectId && !orgId ? true : false
  );
  const routeParts = route?.replace(/^\//, "").split("/");
  const firstRoute = routeParts[0];

  const {
    data: ProjectsData,
    refetch: refetchProjects,
    isFetched: isFetchedProjects,
    isFetching,
  } = useGetProjectsData();

  const isBack =
    routeParts.includes("preview") ||
    routeParts.includes("connect") ||
    routeParts.includes("recent") ||
    routeParts.includes("retriever-detail") ||
    routeParts.includes("results");

  const handleClickAlerts = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedProjectId(event.target.value as string);
  };

  const handleChangeProject = (item: any) => {
    router.replace(`${currentPath}?projectId=${item.id}&orgId=${item.org}`);
  };

  const handleBack = () => {
    if (isPilotMode) {
      if (currentPath === "/retrievers/connect") {
        router.push(`/retrievers/new?projectId=${projectId}&orgId=${orgId}`);
      } else if (routeParts.includes("result")) {
        router.push(`/request?id=${id}&projectId=${projectId}&orgId=${orgId}`);
      } else {
        router.back();
      }
    } else {
      router.back();
    }
  };

  console.log(currentPath, "currentPath");

  useEffect(() => {
    if (
      !projectId &&
      !orgId &&
      !selectedProjectId &&
      isFetchedProjects &&
      isPilotMode &&
      ProjectsData?.items
    ) {
      setSelectedProjectId(ProjectsData?.items[0]?.id);
      router.push(
        `${currentPath}?projectId=${ProjectsData?.items[0]?.id}&orgId=${ProjectsData?.items[0]?.org}`
      );
    }
    if (isFetchedProjects) {
      setGlobalLoadings(false);
    }
  }, [isFetchedProjects, ProjectsData]);

  useEffect(() => {
    if (isPilotMode && !projectId && !orgId) {
      refetchProjects();
    }
  }, [refetchProjects, projectId, orgId]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "10px 31px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "211px",
          bgcolor: palette.opacity.lightBlue,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isBack ? (
            <Box onClick={() => handleBack()}>
              <Typography
                variant="text-md-bold"
                sx={{
                  color: palette.base.white,
                  display: "flex",
                  gap: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Icon icon="arrowLeftIcon" height={24} width={24} />
              </Typography>
            </Box>
          ) : firstRoute === PagesType.RECENT_REQUESTS ? (
            <CustomLink href={"/create"}>
              <Typography
                variant="text-md-bold"
                sx={{
                  color: palette.base.white,
                  display: "flex",
                  gap: 1,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <Icon icon="arrowLeftIcon" height={24} width={24} />
                Back
              </Typography>
            </CustomLink>
          ) : (
            ""
          )}
          {isPilotMode && (
            <>
              {globalLoadings || isFetching ? (
                <Box sx={{ width: "200px" }}>
                  <Skeleton sx={{ height: "46px" }} />
                </Box>
              ) : (
                <Box>
                  <FormControl sx={{ width: "200px" }}>
                    <InputLabel>Projects</InputLabel>
                    <Select
                      value={selectedProjectId}
                      size="small"
                      label="Projects"
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
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <NotificationIconButton
            icon="annotation"
            iconHeight={24}
            iconWidth={24}
            onClick={() => handleClickAlerts()}
            isNotice={isPilotMode ? false : true}
          />
          <NotificationIconButton
            icon="bell"
            iconHeight={24}
            iconWidth={24}
            isNotice={isPilotMode ? false : true}
            onClick={() => handleClickAlerts()}
          />
          <CustomButton
            variant="select"
            selectData={{ avatar: "/Images/Icons/avatar.svg", name: "Mav" }}
          />
        </Box>
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};
export default TopNavBar;
