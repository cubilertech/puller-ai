import { PageHeader } from "@/components/PageHeader";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { SingleCardDomyData } from "@/utils/constants";
import { Box, Grid } from "@mui/material";
import { FC } from "react";

const RecentRequestPage: FC = () => {
  return (
    <>
      <Box p={2} height={"98%"}>
        <PageHeader type="Recent" />
        <Grid
          container
          gap={2}
          sx={{
            mt: 3,
            maxHeight: "90%",
            overflow: "auto",
            scrollbarWidth: "none",
            width: "100%",
          }}
        >
          {SingleCardDomyData.map((item, index) => (
            // <CustomLink href="/request/preview" key={index}>
            <SimpleCard
              key={index}
              isFor="Requests"
              title={item.title}
              discription={item.discription}
            />
            // </CustomLink>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RecentRequestPage;
