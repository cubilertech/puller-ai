"use client";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";
import CustomLink from "@/components/Link/link";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import { ResultCard } from "@/components/ResultCard";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { SingleCardDomyData } from "@/utils/constants";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const YourResultsPage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toggleStateWithTimeout = () => {
    setIsLoading(true); // Set state to true initially

    setTimeout(() => {
      setIsLoading(false); // Set state to false after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  useEffect(() => {
    toggleStateWithTimeout();
  }, []);
  const route = useRouter();

  const handleOpenNotes = () => {
    route.push("/request/recent");
  };
  const data = {
    main_title: "Element X Performance by Store and SKU",
    main_discription:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
    fileType: "CSV",
    fileSize: "23 mb",
    fileStructured: "Prototype",
    fileTimestamps: "20 Feb, 2024",
    fileCaveats: "Caveat by",
    fileCaveatsURL: "",
    sources: "From Passage",
    title: "Key Observations",
    discription:
      "Overall, the incremental performance of SKUs introduced within the past year have added 23% lift in Flyease tech product SKU transactions (sales). This was largely driven by the FYT2 product. This represents the strongest launch of a new product with Flyease since inception, masked in part by the decline of several older SKUs. Seasonality mirrored historical performance.",
  };

  return isLoading ? (
    <LoaderComponent type="Processing" />
  ) : (
    <>
      <Box sx={{ width: "98%", m: "auto", mt: 1 }}>
        <PageHeader type="Results" />

        <Box sx={{ display: "flex", gap: 2, pt: 3, width: "100%" }}>
          <Box
            width={"80%"}
            sx={{
              height: "calc(100vh - 200px)",
            }}
          >
            <ResultCard data={data} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "20%",
              height: "calc(100vh - 205px)",
            }}
          >
            <Paper
              onClick={() => handleOpenNotes()}
              type="light-border"
              sx={{
                padding: 2,
                width: "100%",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
                // height: "100%",
              }}
            >
              Puller AI Notes
            </Paper>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: "column",
                // maxHeight: "67vh",
                height: "100%",
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
              {SingleCardDomyData.map((item, i) => (
                <Box mr={-10} width={"100%"} key={i}>
                  <CustomLink href="/request/preview">
                    <SimpleCard
                      isFor="Results"
                      title={item.title}
                      discription={item.discription}
                    />
                  </CustomLink>
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
