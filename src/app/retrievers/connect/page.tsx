import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import ConnectAppsPage from "@/modules/ConnectAppsPage/connectAppsPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <ConnectAppsPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
