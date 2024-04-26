"use client";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";
import AppLayout from "@/common/appLayout/appLayout";
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
        {isLoading ? <LoaderComponent type="Loading" /> : <PreviewDataPage />}
      </AppLayout>
    </>
  );
};

export default Page;
