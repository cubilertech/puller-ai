"use client";
import YourResultsPage from "@/modules/YourResultPage/yourResultPage";
import AppLayout from "@/common/appLayout/appLayout";
import { useEffect, useState } from "react";
import LoaderComponent from "@/common/LoaderComponent/LoaderComponent";

export default function YourResults() {
  const [isLoading, setIsLoading] = useState(true);

  // Display Loader on initail render
  const toggleStateWithTimeout = () => {
    setIsLoading(true); // Set state to true initially

    setTimeout(() => {
      setIsLoading(false); // Set state to false after 5 seconds
    }, 4000); // 4000 milliseconds = 5 seconds
  };

  useEffect(() => {
    toggleStateWithTimeout();
  }, []);
  return (
    <AppLayout>
      {isLoading ? <LoaderComponent type="Processing" /> : <YourResultsPage />}
    </AppLayout>
  );
}
