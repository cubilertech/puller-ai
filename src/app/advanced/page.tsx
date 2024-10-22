import AppLayout from "@/common/appLayout/appLayout";
import AdvancedPage from "@/modules/AdvancedPage/advancedPage";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading advanced page...</div>}>
      <AppLayout>
        <AdvancedPage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
