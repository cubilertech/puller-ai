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
import { Icon } from "../Icon";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "../logo";
import { SideBar_Data } from "@/utils/data";
import { palette } from "@/theme/Palette";
import "./sideNavbar.css";

const SideNavbar = () => {
  const Route = useRouter();
  const pathname = usePathname();

  const path = pathname.split("/")[1];
  const drawerWidth = 200;
  useEffect(() => {
    if (pathname === "/") {
      Route.push("/request");
    }
  }, []);
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
          borderRight: `1px solid ${palette.color.gray[150]} `,
          background: palette.linearGradient.lightGray,
          "& .MuiDrawer-paper": {
            width: drawerWidth,

            boxSizing: "border-box",
            borderRight: `1px solid ${palette.color.gray[150]} `,
            background: palette.linearGradient.lightGray,
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
                {SideBar_Data.map((item, index) => (
                  <ListItem key={index}>
                    <Link href={item.link} style={{ width: "100%" }}>
                      <div className="navbar-container">
                        <MuiListItemButton
                          sx={{
                            display: "flex",
                            gap: "12px",
                            border:
                              path === item.name
                                ? "1px solid #8f8f94"
                                : "1px solid transparent",
                            background:
                              path === item.name.toLowerCase()
                                ? "rgb(118,119,124)"
                                : path === "" && index === 0
                                  ? "rgb(118,119,124)"
                                  : "",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Icon width={18} height={18} icon={item.icon} />
                          </ListItemIcon>

                          <ListItemText
                            sx={{
                              fontSize: "14px",
                            }}
                            primary={item.name}
                          />
                        </MuiListItemButton>
                      </div>
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
                <ListItem key={index}>
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
