"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import PreviewDataPage from "@/modules/PreviewDataPage/previewDataPage";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        {isLoading ? (
          <Loader variant="pageLoader" type="Loading" />
        ) : (
          <PreviewDataPage />
        )}
      </AppLayout>
    </Suspense>
  );
}

export default Page;
