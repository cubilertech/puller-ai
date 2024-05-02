import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { PannelArea } from "../PannelArea";

const CreateRequestPage = () => {
  return (
    <Box sx={{ px: 1.2, pt: 1 }}>
      <PageHeader
        title="Create a Request"
        buttons={[
          {
            label: "Request History",
            variant: "request-history",
            href: "/request/recent",
          },
        ]}
      />
      <Box sx={{ pt: 2, width: "96%", m: "auto" }}>
        <PannelArea />
      </Box>
    </Box>
  );
};

export default CreateRequestPage;
