"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useEffect, useState } from "react";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";

function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);
  return (
    <AppLayout>
      {isLoading ? <LoaderComponent type="Processing" /> : <YourResultsPage />}
    </AppLayout>
  );
}

export default Page;
