import AppLayout from "@/common/appLayout/appLayout";
import RetrieverDetailPage from "@/modules/RetrieverDetailPage/retrieverDetailPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading retriever detail page...</div>}>
      <AppLayout>
        <RetrieverDetailPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
