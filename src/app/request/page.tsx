"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import RequestPage from "@/modules/Request";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <RequestPage />
      </AppLayout>
    </Suspense>
  );
}
export default Page;
