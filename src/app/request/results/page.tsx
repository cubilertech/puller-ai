"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useParams } from "next/navigation";
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
        <YourResultsPage id={id as string} />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
