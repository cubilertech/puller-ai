"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MuiListItemButton from "@/theme/overrides/listItemButton";
import Logo from "../logo/logo";
import { Icon } from "../Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const pathname = usePathname();

  const path = pathname.split("/")[1];
  const drawerWidth = 240;
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
          borderRight:
            "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
          background:
            "linear-gradient(143deg, rgba(57, 57, 57, 0.60) -3.54%, rgba(97, 97, 97, 0.60) 99.99%)",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            marginRight: drawerWidth,

            boxSizing: "border-box",
            borderRight:
              "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
            background:
              "linear-gradient(143deg, rgba(57, 57, 57, 0.60) -3.54%, rgba(97, 97, 97, 0.60) 99.99%)",
            boxShadow:
              "0px 1.127px 3.38px 0px rgba(255, 255, 255, 0.25) inset, 0px 0.501px 12.02px -0.501px rgba(0, 0, 0, 0.18)",
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
              <Logo variant="default" />
            </Box>

            <Box>
              <List>
                {[
                  {
                    name: "Request",
                    img: <Icon width={18} height={18} icon="requestIcon" />,
                    link: "/request",
                  },
                  {
                    name: "Pulls",
                    img: <Icon width={18} height={18} icon="pullsIcon" />,
                    link: "/pulls",
                  },
                  {
                    name: "Retrivers",
                    img: <Icon width={18} height={18} icon="retriversIcon" />,
                    link: "/retrivers",
                  },
                  {
                    name: "Alerts",
                    img: <Icon width={18} height={18} icon="alertsIcon" />,
                    link: "/alerts",
                  },
                  {
                    name: "Advanced",
                    img: <Icon width={18} height={18} icon="advancedIcon" />,
                    link: "/advanced",
                  },
                ].map((text, index) => (
                  <ListItem key={text.name}>
                    <Link href={text.link} style={{ width: "100%" }}>
                      <MuiListItemButton
                        sx={{
                          display: "flex",
                          gap: "12px",
                          border:
                            path === text.name
                              ? "1px solid #8f8f94"
                              : "1px solid transparent",
                          background:
                            path === text.name.toLowerCase()
                              ? "rgb(118,119,124)"
                              : path === "" && index === 0
                                ? "rgb(118,119,124)"
                                : "",
                          ":hover": {
                            // border:
                            //   "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
                            // border: "1px solid #8f8f94",
                            // background:
                            //   "var(--buttons, rgba(255, 255, 255, 0.30))",
                            // backdropFilter: "blur(8px)",
                          },
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
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Box>
            <List>
              {[
                {
                  name: "Administration",
                  img: <Icon width={18} height={18} icon="adminIcon" />,
                },
              ].map((text, index) => (
                <ListItem key={text.name}>
                  <MuiListItemButton>
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
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideNavbar;
