import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import MuiListItemButton from "@/theme/overrides/listItemButton";

const SideNavbar = () => {
  const drawerWidth = 240;
  return (
    <Box
      sx={{
        borderRight:
          "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",

        background:
          "linear-gradient(143deg, rgba(57, 57, 57, 0.60) -3.54%, rgba(97, 97, 97, 0.60) 99.99%)",
      }}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          borderRight:
            "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
          background:
            "linear-gradient(143deg, rgba(57, 57, 57, 0.60) -3.54%, rgba(97, 97, 97, 0.60) 99.99%)",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
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
              <Image
                width={186}
                height={63}
                src={"./logo/Logo.svg"}
                alt="logo"
              />
            </Box>

            <Box>
              <List>
                {[
                  {
                    name: "Request",
                    img: (
                      <Image
                        width={18}
                        height={18}
                        src="./images/icons/request-icon.svg"
                        alt=""
                      />
                    ),
                  },
                  {
                    name: "Pulls",
                    img: (
                      <Image
                        width={18}
                        height={18}
                        src="./images/icons/pulls-icon.svg"
                        alt=""
                      />
                    ),
                  },
                  {
                    name: "Retrivers",
                    img: (
                      <Image
                        width={18}
                        height={18}
                        src="./images/icons/retrivers-icon.svg"
                        alt=""
                      />
                    ),
                  },
                  {
                    name: "Alerts",
                    img: (
                      <Image
                        width={18}
                        height={18}
                        src="./images/icons/alerts-icon.svg"
                        alt=""
                      />
                    ),
                  },
                  {
                    name: "Advanced",
                    img: (
                      <Image
                        width={18}
                        height={18}
                        src="./images/icons/advanced-icon.svg"
                        alt=""
                      />
                    ),
                  },
                ].map((text, index) => (
                  <ListItem key={text.name}>
                    <MuiListItemButton
                    
                      sx={{
                        display: "flex",
                        gap: "12px",
                        ":hover": {
                          borderRadius: "8px",
                          border:
                            "1px solid var(--Vision-pro-01, rgba(255, 255, 255, 0.37))",
                          background:
                            "var(--buttons, rgba(255, 255, 255, 0.30))",
                          backdropFilter: "blur(8px)",
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
                  img: (
                    <Image
                      width={18}
                      height={18}
                      src="./images/icons/admin-icon.svg"
                      alt=""
                    />
                  ),
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
