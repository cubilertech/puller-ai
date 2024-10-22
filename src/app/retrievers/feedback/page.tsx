import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import FeedbackPage from "@/modules/FeedbackPage/feedbackPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <FeedbackPage variant="retriever" />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
