import RecentRequestPage from "@/modules/RecentRequestPage/recentRequestPage";
import AppLayout from "@/common/appLayout/appLayout";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

function Page() {
  return (
      <Suspense
        fallback={
          <Loader type="Processing" variant="pageLoader" message={"Loading"} />
        }
      >
    <AppLayout>
        <RecentRequestPage />
    </AppLayout>
      </Suspense>
  );
}
export default Page;
