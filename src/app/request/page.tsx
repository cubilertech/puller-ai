"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { getIsLoadingRequest } from "@/libs/redux/features/isLoadingRequest";
import { useAppSelector } from "@/libs/redux/hooks";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage";
import ValidateRequestPage from "@/modules/ValidateRequestPage/validateRequestPage";
import { useEffect, useState } from "react";

function Page() {
  const [id, setId] = useState<string | null>(null);
  const isLoadingResponse = useAppSelector(getIsLoadingRequest);

  useEffect(() => {
    // Function to retrieve ID from URL
    const getIdFromParams = () => {
      const url = window.location.href;
      const urlParams = new URLSearchParams(url.split("?")[1]); // Extract query parameters
      const idParams = urlParams.get("id");

      if (idParams) {
        setId(idParams);
        console.log(idParams, "data"); // Update state if ID is found
      }
    };

    // Initial check for ID
    getIdFromParams();

    // Loop while isLoadingResponse is true
    const intervalId = setInterval(() => {
      if (!isLoadingResponse) {
        clearInterval(intervalId);
        return;
      }
      if (id) {
        clearInterval(intervalId);
        return;
      }


      getIdFromParams();
    }, 1000); // Adjust interval as needed (e.g., 500ms)

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [isLoadingResponse]);
  console.log("data", id);
  return (
    <AppLayout>
      {isLoadingResponse || id ? (
        <ValidateRequestPage id={id as string} />
      ) : (
        <CreateRequestPage />
      )}
    </AppLayout>
  );
}
export default Page;
