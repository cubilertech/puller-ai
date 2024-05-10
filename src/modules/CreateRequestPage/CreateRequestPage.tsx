import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { PannelArea } from "../PannelArea";
import { CURRENT_MODE, MODES } from "@/utils/constants";

const CreateRequestPage = () => {
  return (
    <Box sx={{ px: 1.5, pt: 1 }}>
      <PageHeader
        title="Create a Request"
        buttons={
          CURRENT_MODE === MODES.DEMO
            ? [
                {
                  label: "Request History",
                  variant: "request-history",
                  href: "/request/recent",
                },
              ]
            : undefined
        }
      />
      <Box sx={{ pt: 2, width: "100%", m: "auto" }}>
        <PannelArea />
      </Box>
    </Box>
  );
};

export default CreateRequestPage;
