"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import MuiListItemButton from "@/theme/overrides/listItemButton";
import { Icon } from "../Icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { SideBar_Data } from "@/utils/data";
import { palette } from "@/theme/Palette";
import "./sideNavbar.css";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { AlertModal } from "@/modals/AlertModal";
import { CommentOutlined, InfoOutlined } from "@mui/icons-material";
import { useAppDispatch } from "@/libs/redux/hooks";
import { UpdateCurrentPage } from "@/libs/redux/features/isLoadingRequest";

const SideNavbar = () => {
  const Route = useRouter();
  const pathname = usePathname();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const path = pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const drawerWidth = 234;
  const handleAlert = (link: string) => {
    const isAlert = link === "alert" ? true : false;
    const isRequest = link === "/request" ? true : false;
    if (CURRENT_MODE === MODES.PILOT && isAlert) {
      setIsOpenAlert(true);
    }
    if (isRequest) {
      dispatch(UpdateCurrentPage("create"));
    }
    console.log(link, "link");
    Route.push(isAlert ? "#" : link);
  };
  return (
    <Box
      sx={{
        width: drawerWidth,
      }}
    >
      <Drawer
        sx={{
          position: "static",
          flexShrink: 0,
          // borderRight: `1px solid ${palette.color.gray[150]} `,
          background: palette.linearGradient.lightGray,
          "& .MuiDrawer-paper": {
            width: drawerWidth,

            boxSizing: "border-box",
            // borderRight: `1px solid ${palette.color.gray[150]} `,
            background: palette.linearGradient.lightGray,
            boxShadow:
              "0px 1px 18px 4px rgba(255, 255, 255, 0.25), 0px 0.501px 12.02px -0.501px rgba(0, 0, 0, 0.18)",
            backdropFilter: "blur(30px)",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "20px",
            minHeight: "100vh",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                mt: "0px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  mt: 1.2,
                  pl: 2.1,
                }}
              >
                <Logo variant="default" />
              </Box>
              {CURRENT_MODE === MODES.PILOT && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "50px",
                    width: "fit-content",
                    padding: "0px 8px",
                    mr: "30px",
                    mt: "-15px",
                    backgroundColor: "#263f50",
                    border: 0,
                  }}
                >
                  <Typography
                    sx={{
                      background:
                        "linear-gradient(274deg, rgba(141,107,255,1) 2%, rgba(91,145,252,1) 50%, rgba(6,191,250,1) 99%)",
                      fontSize: "10px",
                      fontWeight: "900",
                      "$-webkit-background-clip": "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                    variant="text-xxs-bold"
                  >
                    Private Beta
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: 1 }}>
              <List>
                {SideBar_Data.map((item, index) => (
                  <ListItem key={index} sx={{ py: "4px" }}>
                    {/* <Link
                      href={item.link === "alert" ? "#" : item.link}
                      style={{ width: "100%" }}
                    > */}
                    <div className="navbar-container">
                      <MuiListItemButton
                        sx={{
                          display: "flex",
                          gap: "12px",
                          height: "40px",
                          color: palette.base.white,
                          border:
                            path === item.name.toLowerCase()
                              ? "1px solid #8f8f94 !important"
                              : "1px solid transparent",
                          background:
                            path === item.name.toLowerCase()
                              ? "rgb(118,119,124)"
                              : path === "" && index === 0
                                ? "rgb(118,119,124)"
                                : "",
                          "& .MuiTypography-root": {
                            fontWeight:
                              path === item.name.toLowerCase() ? 600 : "",
                          },

                          ":hover": {
                            border:
                              path === item.name.toLowerCase()
                                ? "1px solid transparent !important"
                                : "",
                            "& .MuiTypography-root": {
                              fontWeight: 600,
                            },
                          },
                        }}
                        onClick={() => handleAlert(item.link)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          {item.name === "Request" ? (
                            <CommentOutlined
                              sx={{ width: "18px", height: "18px" }}
                            />
                          ) : (
                            <Icon width={18} height={18} icon={item.icon} />
                          )}
                        </ListItemIcon>

                        <ListItemText
                          sx={{
                            fontSize: "14px",
                          }}
                          className="child"
                          primary={item.name}
                        />
                      </MuiListItemButton>
                    </div>
                    {/* </Link> */}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Box>
            <List>
              {CURRENT_MODE === MODES.PILOT && (
                <ListItem sx={{ pb: 3 }}>
                  <div className="navbar-container">
                    <MuiListItemButton
                      onClick={() => handleAlert("alert")}
                      sx={{
                        width: "100%",
                        color: palette.base.white,
                        border: "1px solid transparent",
                        height: "40px",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                        }}
                      >
                        <InfoOutlined sx={{ width: 18, height: 18 }} />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        Private Beta Help
                      </ListItemText>
                    </MuiListItemButton>
                  </div>
                </ListItem>
              )}
              {CURRENT_MODE === MODES.DEMO &&
                [
                  {
                    name: "Administration",
                    img: <Icon width={18} height={18} icon="adminIcon" />,
                  },
                ].map((text, index) => (
                  <ListItem key={index}>
                    <div className="navbar-container">
                      <MuiListItemButton
                        sx={{
                          color: palette.base.white,
                          border:
                            path === text.name
                              ? "1px solid #8f8f94"
                              : "1px solid transparent",
                          height: "40px",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                          }}
                        >
                          {text.img}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            fontSize: "14px",
                          }}
                          primary={text.name}
                        />
                      </MuiListItemButton>
                    </div>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Drawer>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default SideNavbar;
