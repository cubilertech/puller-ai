import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import RetrieversPage from "@/modules/RetrieversPage/retrieversPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <RetrieversPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
