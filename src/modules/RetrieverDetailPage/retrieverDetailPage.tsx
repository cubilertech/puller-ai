import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

const data = [1, 2, 3, 4];

const RetrieverDetailPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <PageHeader type="Retriever Detail" />
      <Paper
        type="light-border"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "2rem",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={"1rem"}
        >
          <Box position={"relative"}>
            <Image
              src={"/Images/retriever-detail.svg"}
              alt="icon"
              width={60}
              height={60}
            />
            <Box position={"absolute"} top={4} right={3}>
              <Icon icon="live" width={12} height={12} />
            </Box>
          </Box>

          <Typography variant="display-xs-semibold" sx={{ lineHeight: "36px" }}>
            Retrievers 1
          </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
          <Typography variant="text-xl-semibold">About Retrievers</Typography>
          <Typography variant="text-sm">
            Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
            semper tellus. Pellentesque vitae tellus non dui fermentum
            hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus
            orci eu eros tempus efficitur. Nulla rhoncus arcu nec dictum
            condimentum. Aenean sapien leo, maximus nec magna vel, gravida
            auctor quam. Cras congue massa massa, id luctus elit ultricies at.
            Maecenas in neque justo. Ut ac tincidunt lorem, non posuere metus.
            Sed vulputate pellentesque lectus, id luctus turpis interdum vel.
            Fusce aliquet condimentum arcu id elementum.
          </Typography>
        </Box>

        <Divider />

        <Box
          display={"grid"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"4"}
        >
          <Box borderRight={"1px solid rgba(230, 230, 230, 0.3)"}>
            <Typography variant="text-xl-semibold">Usage History</Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              paddingRight={"2rem"}
              mt={"2rem"}
            >
              {data.map((item, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  gap={"1rem"}
                  alignItems={"flex-start"}
                >
                  <Typography variant="text-sm">12/02/2024</Typography>
                  <Typography variant="text-sm">|</Typography>
                  <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
                    <Typography variant="text-sm">
                      Aliquam a dui vel justo fringilla euismod id id enim. Nunc
                      non semper tellus. Pellentesque
                    </Typography>
                    <Typography variant="text-md-regular">
                      Title of the notification
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box paddingLeft={"2rem"}>
            <Typography variant="text-xl-semibold">Alert History</Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              mt={"2rem"}
            >
              {data.map((item, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  gap={"1rem"}
                  alignItems={"flex-start"}
                >
                  <Typography variant="text-sm">12/02/2024</Typography>
                  <Typography variant="text-sm">|</Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"0.5rem"}
                    justifyContent={"flex-start"}
                  >
                    <Typography variant="text-md-regular">
                      Title of the notification
                    </Typography>
                    <Typography variant="text-sm">
                      Aliquam a dui vel justo fringilla euismod id id enim. Nunc
                      non semper tellus. Pellentesque
                    </Typography>
                    {(index === 1 || index === 2) && (
                      <Box width={134} height={38}>
                        <Button
                          variant="outlined"
                          label="Request Access"
                          fullWidth
                          sx={{
                            minHeight: "38px",
                            height: "38px !important",
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RetrieverDetailPage;
