import { Box } from "@mui/material";
import { SideNavbar } from "@/components/SideNavbar";
import AppLayout from "@/components/appLayout/appLayout";
import ValidateRequestPage from "@/modules/ValidateRequestPage/validateRequestPage";

export default function CreateRequest() {
  return (
    <>
      <SideNavbar />
      <ValidateRequestPage  />
    </>
  );
}
