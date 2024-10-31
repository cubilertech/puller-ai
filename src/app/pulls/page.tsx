import AppLayout from "@/common/appLayout/appLayout";
import TemplatePage from "@/modules/TemplatePage/TemplatePage";
import React, { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading pulls page...</div>}>
      <AppLayout>
        <TemplatePage />
      </AppLayout>
    </Suspense>
  );
}

export default Page;
