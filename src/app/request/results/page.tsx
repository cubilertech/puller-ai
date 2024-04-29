"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";

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
      {isLoading ? (
        <Loader variant="pageLoader" type="Processing" />
      ) : (
        <YourResultsPage />
      )}
    </AppLayout>
  );
}

export default Page;
