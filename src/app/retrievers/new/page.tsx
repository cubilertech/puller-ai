import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import SelectNewRetriverPage from "@/modules/SelectNewRetriverPage/selectNewRetriverPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <SelectNewRetriverPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
