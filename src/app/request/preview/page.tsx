"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import PreviewDataPage from "@/modules/PreviewDataPage/previewDataPage";
import { useEffect, useState } from "react";

function Page () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <AppLayout>
        {isLoading ? <Loader variant="pageLoader" type="Loading" /> : <PreviewDataPage />}
      </AppLayout>
    </>
  );
};

export default Page;
