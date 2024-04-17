import { PageHeader } from "@/components/PageHeader";
import RectangleCardWithIcon from "@/components/RectangleCardWithIcon/rectangleCardWithIcon";
import { Box, Typography } from "@mui/material";

const CreateNewRetriverPage = () => {
  return (
    <Box p={"2rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <PageHeader type="New Retriver" />
      <Box display={"flex"} gap={"2rem"}>
        <RectangleCardWithIcon icon="connectApps" title="Connect Apps" />
        <RectangleCardWithIcon icon="apiKey" title="Get API Key" />
        <RectangleCardWithIcon icon="upload" title="Uplaod Data" />
      </Box>
    </Box>
  );
};

export default CreateNewRetriverPage;
