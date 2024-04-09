import { PageHeader } from "@/components/PageHeader";
import { SideNavbar } from "@/components/SideNavbar";
import { Box, TextareaAutosize } from "@mui/material";
import { PannelArea } from "../PannelArea";

const CreateRequestPage = () => {
  return (
    <Box
      sx={{
        padding: "1rem 2rem 1rem",
      }}
    >
      <PageHeader type="create" />
      <PannelArea />
    </Box>
  );
};

export default CreateRequestPage;
