import AppLayout from "@/common/appLayout/appLayout";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage";

export default function Home() {
  return (
    <>
      <AppLayout>
        <CreateRequestPage />
      </AppLayout>
    </>
  );
}
