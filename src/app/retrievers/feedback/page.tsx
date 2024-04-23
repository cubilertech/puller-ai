"use client";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";
import AppLayout from "@/common/appLayout/appLayout";
import FeedbackPage from "@/modules/FeedbackPage/feedbackPage";
import { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toggleStateWithTimeout = () => {
    setIsLoading(true); // Set state to true initially

    setTimeout(() => {
      setIsLoading(false); // Set state to false after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  useEffect(() => {
    toggleStateWithTimeout();
  }, []);
  return (
    <AppLayout>
      {isLoading ? (
        <LoaderComponent type="Loading" />
      ) : (
        <FeedbackPage type="retriever" />
      )}
    </AppLayout>
  );
};

export default Page;
