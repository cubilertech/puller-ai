import TopNavBar from "@/components/TopNavBar/topNavBar";
import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { ResultCard } from "@/components/ResultCard";

export default function CreateRequest() {
  const data =  {
    main_title: "Element X Performance by Store and SKU",
    main_discription: "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
    fileType: "CSV",
    fileSize: "23 mb",
    fileStructured: "Prototype",
    fileTimestamps: "20 Feb, 2024",
    fileCaveats: "Caveat by See More",
    fileCaveatsURL: "",
    sources: "From Passage",
    title: "Key Observations",
    discription: "Overall, the incremental performance of SKUs introduced within the past year have added 23% lift in Flyease tech product SKU transactions (sales). This was largely driven by the FYT2 product. This represents the strongest launch of a new product with Flyease since inception, masked in part by the decline of several older SKUs. Seasonality mirrored historical performance.",
  }
  return (
    <Box sx={{ m: 6 }}>
      <ResultCard data={data} />
    </Box>
  );
}
