import { PageHeader } from "@/components/PageHeader";
import RectangleCardWithIcon from "@/components/RectangleCardWithIcon/rectangleCardWithIcon";
import { Box } from "@mui/material";

const AdvancedPage = () => {
  return (
    <Box p={"1rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader type="Advanced" />
      {/* Card Container */}
      <Box
        display={"flex"}
        gap={"2rem"}
        flexDirection={{ md: "row", xs: "column" }}
      >
        <RectangleCardWithIcon icon="apiKey" title="Advanced Analytics" />
        <RectangleCardWithIcon
          icon="connectApps"
          title="Connect to App or Dashboard"
        />
        <RectangleCardWithIcon icon="cpu" title="Connect to AI Model" />
      </Box>
    </Box>
  );
};

export default AdvancedPage;
