import AppLayout from "@/common/appLayout/appLayout";
import CreateAlertPage from "@/modules/CreateAlertPage/createAlertPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading alert create page...</div>}>
      <AppLayout>
        <CreateAlertPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
