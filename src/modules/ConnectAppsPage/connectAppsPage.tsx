import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import Searchbar from "@/components/SideNavbar/searchbar";
import { Box, Divider, Input, InputAdornment, Typography } from "@mui/material";
import Image from "next/image";

const data = [
  {
    image: "/Images/blank-square.svg",
    name: "dbt Core",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Snowflake",
    isConnected: true,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Snowflake",
    isConnected: true,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Snowflake",
    isConnected: true,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Amazon Redshift",
    isConnected: false,
  },
  {
    image: "/Images/blank-square.svg",
    name: "Snowflake",
    isConnected: true,
  },
];

const ConnectAppsPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        height: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <PageHeader type="Connect App" />
      <Paper
        type="light-border"
        sx={{
          height: "calc(100vh - 220px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(142.96deg, rgba(255, 255, 255, 0.148) -3.54%, rgba(114, 114, 114, 0.168) 95.15%)",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            minHeight: "5rem",
            display: "flex",
            justifyContent: "space-between",
            padding: "2rem",
            alignItems: "center",
          }}
        >
          <Searchbar width={409} height={44} />
          <Button
            variant="contained"
            sx={{
              width: "220px",
              height: "44",
            }}
            label="Create Retriever"
          />
        </Box>

        <Box
          sx={{
            MaxHeight: "80%",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          {data.map((item, index) => (
            <Box key={index}>
              <Box
                sx={{
                  padding: "1rem 2rem",
                }}
              >
                <Box
                  display={"flex"}
                  py={"0.5rem"}
                  justifyContent={"space-between"}
                >
                  <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                    <Image src={item.image} alt="pic" width={37} height={37} />
                    <Typography variant="text-md-semibold">
                      {item.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant={item.isConnected ? "contained" : "outlined"}
                      label={item.isConnected ? "Connected" : "Connect"}
                      fullWidth
                      sx={{
                        width: "98px",
                        height: "34px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Divider
                sx={{
                  backgroundColor:
                    "linear-gradient(142.96deg, rgba(57, 57, 57, 0.6) -3.54%, rgba(97, 97, 97, 0.6) 99.99%)",
                }}
              />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConnectAppsPage;
