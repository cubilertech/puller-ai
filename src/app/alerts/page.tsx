import AppLayout from "@/common/appLayout/appLayout";
import AlertsPage from "@/modules/AlertsPage/alertsPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading alerts page...</div>}>
      <AppLayout>
        <AlertsPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
