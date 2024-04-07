import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { ResultCard } from "@/components/ResultCard";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { SingleCardDomyData } from "@/utils/constants";
import { Box } from "@mui/material";
import { FC } from "react";

const YourResultsPage: FC = () => {
  const data = {
    main_title: "Element X Performance by Store and SKU",
    main_discription:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
    fileType: "CSV",
    fileSize: "23 mb",
    fileStructured: "Prototype",
    fileTimestamps: "20 Feb, 2024",
    fileCaveats: "Caveat by See More",
    fileCaveatsURL: "",
    sources: "From Passage",
    title: "Key Observations",
    discription:
      "Overall, the incremental performance of SKUs introduced within the past year have added 23% lift in Flyease tech product SKU transactions (sales). This was largely driven by the FYT2 product. This represents the strongest launch of a new product with Flyease since inception, masked in part by the decline of several older SKUs. Seasonality mirrored historical performance.",
  };
  return (
    <>
      <Box mt={4}>
        <PageHeader />

        <Box sx={{ display: "flex", gap: 2, mt: 3, width: "98%" }}>
          <Box width={"80%"}>
            <ResultCard data={data} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", width: "20%" }}>
            <Paper
              type="light-border"
              sx={{
                padding: 2,
                width: "100%",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              Puller AI Notes
            </Paper>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                maxHeight: "70vh",
                overflowY: "auto",
                "-ms-overflow-style":
                  "none" /* Hide scrollbar in IE and Edge */,
                scrollbarWidth: "none" /* Hide scrollbar in Firefox */,
                "&::-webkit-scrollbar": {
                  display: "none" /* Hide scrollbar in WebKit browsers */,
                },
                mt: 2,
              }}
            >
              {SingleCardDomyData.map((item) => (
                <Box mr={-10} width={"100%"}>
                  <SimpleCard
                    isFor="Results"
                    title={item.title}
                    discription={item.discription}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default YourResultsPage;
