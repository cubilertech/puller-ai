"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { useParams } from "next/navigation";
import PreviewDataPage from "@/modules/PreviewDataPage/previewDataPage";

function Page() {
  const { id } = useParams();
  return (
    <AppLayout>
      <PreviewDataPage id={id as string}/>
    </AppLayout>
  );
}

export default Page;
