import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { PannelArea } from "../PannelArea";

const CreateRequestPage = () => {
  return (
    <Box sx={{ maxWidth: "1100px", pt: 1, m: "auto" }}>
      <PageHeader
        title="Create a Request"
        buttons={
          // CURRENT_MODE === MODES.DEMO
          [
            {
              label: "Request History",
              variant: "request-history",
              href: "/request/recent",
            },
          ]
          // : undefined
        }
      />
      <Box sx={{ pt: 2, width: "100%", m: "auto" }}>
        <PannelArea />
      </Box>
    </Box>
  );
};

export default CreateRequestPage;
