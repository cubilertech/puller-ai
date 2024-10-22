"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

function Page() {
  const { id } = useParams();
  return (
    <AppLayout>
      <Suspense
        fallback={
          <Loader type="Processing" variant="pageLoader" message={"Loading"} />
        }
      >
        <YourResultsPage id={id as string} />
      </Suspense>
    </AppLayout>
  );
}

export default Page;
