import { PageHeader } from "@/components/PageHeader";
import { RequestsCard } from "@/components/RecentRequestes-Card";
import { SingleCardDomyData } from "@/utils/data";
import { Box } from "@mui/material";
import { FC } from "react";

const RecentRequestPage: FC = () => {
  return (
      <Box
        p={2}
        height={"98%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"2rem"}
      >
        <PageHeader variant="Recent" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
              lg: "1fr 1fr 1fr 1fr",
              xl: "repeat(5, 1fr)",
            },
            gap: "15px",
            placeItems: "stretch",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          {SingleCardDomyData.map((item, index) => (
            // <CustomLink href="/request/preview" key={index}>
            <RequestsCard
              key={index}
              title={item.title}
              discription={item.discription}
            />
            // </CustomLink>
          ))}
        </Box>
      </Box>
  );
};

export default RecentRequestPage;
