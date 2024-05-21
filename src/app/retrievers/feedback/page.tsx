"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { Loader } from "@/components/Loader";
import FeedbackPage from "@/modules/FeedbackPage/feedbackPage";
import { useEffect, useState } from "react";

function Page() {
  return (
    <AppLayout>
      <FeedbackPage variant="retriever" />
    </AppLayout>
  );
}

export default Page;
