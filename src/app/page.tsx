import { Box } from "@mui/material";
import { IconButton } from "@/components/IconButton";
import Logo from "@/components/logo/logo";
import AppLayout from "@/components/appLayout/appLayout";
import CreateRequest from "./createRequest/page";
import { PageHeader } from "@/components/PageHeader";

export default function Home() {
  return (
    <>
      <AppLayout>
        <Box
          sx={{
            padding: "1rem 2rem 1rem",
          }}
        ></Box>
      </AppLayout>
    </>
  );
}
