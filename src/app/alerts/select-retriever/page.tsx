import AppLayout from "@/common/appLayout/appLayout";
import SelectRetrieverPage from "@/modules/SelectRetrieverPage/selectRetrieverPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading select retriever page...</div>}>
      <AppLayout>
        <SelectRetrieverPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
