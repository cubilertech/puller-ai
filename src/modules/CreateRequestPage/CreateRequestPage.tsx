import { PageHeader } from "@/components/PageHeader";
import { SideNavbar } from "@/components/SideNavbar";
import { InputArea } from "@/components/inputArea";
import { Box, TextareaAutosize } from "@mui/material";

const CreateRequestPage = () => {
  return (
    <Box
      sx={{
        padding: "1rem 2rem 1rem",
      }}
    >
      <PageHeader type="create" />
      <InputArea />
    </Box>
  );
};

export default CreateRequestPage;
