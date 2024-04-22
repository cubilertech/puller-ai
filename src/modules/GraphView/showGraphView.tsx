import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import PanelArea from "./panelArea";

const ShowGraphView = () => {
  return (
    <Box sx={{ px: 1.2, pt: 1 }}>
      <PageHeader type="graph" />
      <Box sx={{ pt: 2, width: "97%", m: "auto" }}>
        <PanelArea />
      </Box>
    </Box>
  );
};

export default ShowGraphView;
