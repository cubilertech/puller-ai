"use client";
import { palette } from "@/theme/Palette";
import {
  Box,
  Button,
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
import { useGetClientInfo } from "@/hooks/useMeta";
import Image from "next/image";
import { Menu } from "../Menu";
import { useDispatch, useSelector } from "react-redux";
import { getClientData, setClientData } from "@/libs/redux/features/clientdata";

const TopNavBar = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const clientDataRedux = useSelector(getClientData);
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const route = usePathname();
  const dispatch = useDispatch();
  const currentPath = isClient ? window.location.pathname : "";
  const router = useRouter();

  const {
    data: clientData,
    isLoading: clientIsLoading,
    refetch: refetchClient,
  } = useGetClientInfo();
  const [openMenu, setOpenMenu] = useState(false);
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
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };
  const handleMenuClose = () => {
    setOpenMenu(false);
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
    if (isPilotMode) {
      refetchProjects();
    }
  }, [refetchProjects]);

  useEffect(() => {
    if (!clientDataRedux?.connection) {
      console.log("called");
      refetchClient();
    }
    if (!clientDataRedux) {
      dispatch(setClientData(clientData));
    }
  }, [refetchClient, clientData, clientDataRedux]);

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
                          key={item?.id}
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

          <Button
            sx={{
              borderRadius: "50px",
              color: palette.base.white,
              border: `none`,
              background: `none !important`,
              width: 82,
              height: 48,
              py: 1,
              px: 1.2,
              ":hover": {
                border: `1px solid var(--vison-pro-stock, ${palette.base.white})`,
                borderRadius: "50px !important",
                background: `${palette.color.gray[300]} !important`,
              },
            }}
            size="large"
            variant="outlined"
            onClick={handleMenuOpen}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "13px",
              }}
            >
              {clientIsLoading ? (
                <Skeleton
                  sx={{
                    width: "32px",
                    height: "52px",
                    borderRadius: "100%",
                    m: "0px !important",
                    p: 0,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: "100%",
                    width: "32px",
                    height: "32px",
                    background: palette.color.gray[100],
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    p: 1.4,
                  }}
                >
                  <Typography
                    sx={{ textTransform: "uppercase", width: "fit-content" }}
                  >
                    {" "}
                    {clientDataRedux?.name.charAt(0)}
                  </Typography>
                </Box>
              )}
              {/* <Typography variant="text-md-bold">{selectData?.name}</Typography> */}

              <Icon icon="topbarIcon" width={11} height={11} />
            </Box>
          </Button>
          <Menu
            open={openMenu}
            menuItems={[
              {
                text: "Logout",
              },
            ]}
            onClose={handleMenuClose}
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
