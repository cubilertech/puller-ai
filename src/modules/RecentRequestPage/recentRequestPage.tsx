import CustomLink from "@/components/Link/link";
import { PageHeader } from "@/components/PageHeader";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { SingleCardDomyData } from "@/utils/constants";
import { Box, Grid } from "@mui/material";
import { FC } from "react";

const RecentRequestPage: FC = () => {
  return (
    <>
      <Box sx={{ mt: 4 }}>
        <PageHeader type="Recent" />

        <Grid
          container
          gap={2}
          sx={{
            mt: 3,
            maxHeight: "80vh",
            overflow: "auto",
            scrollbarWidth: "none",
            width: "100%",
          }}
        >
          {SingleCardDomyData.map((item, index) => (
            <CustomLink href="/preview" key={index}>
              <SimpleCard
                isFor="Requests"
                title={item.title}
                discription={item.discription}
              />
            </CustomLink>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RecentRequestPage;
