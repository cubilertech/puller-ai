"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import FeedbackPage from "@/modules/FeedbackPage/feedbackPage";
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
    <Suspense fallback={<div>Loading feedback page...</div>}>
      <AppLayout>
        {isLoading ? (
          <Loader variant="pageLoader" type="Loading" />
        ) : (
          <FeedbackPage variant="alert" />
        )}
      </AppLayout>
    </Suspense>
  );
}

export default Page;
