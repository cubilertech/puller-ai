"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useParams } from "next/navigation";

function Page() {
  const { id } = useParams();
  return (
    <AppLayout>
      <YourResultsPage id={id as string}/>
    </AppLayout>
  );
}

export default Page;
