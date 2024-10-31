import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import UploadRetrieverPage from "@/modules/UploadRetrieverPage/uploadRetrieverPage";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <Loader type="Processing" variant="pageLoader" message={"Loading"} />
      }
    >
      <AppLayout>
        <UploadRetrieverPage />
      </AppLayout>
    </Suspense>
  );
};

export default page;
