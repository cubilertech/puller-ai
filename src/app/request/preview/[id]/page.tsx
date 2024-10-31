"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { useParams } from "next/navigation";
import PreviewDataPage from "@/modules/PreviewDataPage/previewDataPage";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

function Page() {
  const { id } = useParams();
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <PreviewDataPage id={id as string} />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
