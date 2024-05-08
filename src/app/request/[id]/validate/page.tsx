"use client";
import AppLayout from "@/common/appLayout/appLayout";
import ValidateRequestPage from "@/modules/ValidateRequestPage/validateRequestPage";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();
  return (
    <AppLayout>
      <ValidateRequestPage id={id as string}/>
    </AppLayout>
  );
}
export default Page;
