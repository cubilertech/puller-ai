import { PageHeader } from "@/components/PageHeader";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { SingleCardDomyData } from "@/utils/constants";
import { Box, Grid } from "@mui/material";
import { FC } from "react";

const RecentRequestPage: FC = () => {
  return (
    <>
      <Box sx={{ mt: 4 }}>
        <PageHeader />

        <Grid
          container
          gap={2}
          sx={{
            mt: 3,
            maxHeight: "83vh",
            overflow: "auto",
            scrollbarWidth: "none",
            width: "100%"
          }}
        >
          {SingleCardDomyData.map((item) => (
            <SimpleCard title={item.title} discription={item.discription} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RecentRequestPage;
