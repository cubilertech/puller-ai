"use client";
import AppLayout from "@/common/appLayout/appLayout";
import { getCurrentPage } from "@/libs/redux/features/isLoadingRequest";
import { useAppSelector } from "@/libs/redux/hooks";
import CreateRequestPage from "@/modules/CreateRequestPage/CreateRequestPage_dep";
import RequestPage from "@/modules/Request";
import ValidateRequestPage from "@/modules/ValidateRequestPage/validateRequestPage";
import { isClient } from "@/utils/constants";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  // const [id, setId] = useState<string | null>(null);
  // const [isCurrentPage, setisCurrentPage] = useState<string | null>(null);
  // const currentPage = useAppSelector(getCurrentPage);
  // const searchParams = useSearchParams()
 
  // const search = searchParams.get('id')
 
  // // This will not be logged on the server when using static rendering
  // // console.log(search, "id")

  // useEffect(() => {
  //   const getIdFromParams = () => {
  //     if (isClient) {
  //       const url = window.location.href;
  //       const urlParams = new URLSearchParams(url.split("?")[1]);
  //       const idParams = urlParams.get("id");

  //       if (idParams) {
  //         setId(idParams);
  //       }
  //     }
  //   };
  //   getIdFromParams();

  //   const intervalId = setInterval(() => {
  //     if (currentPage === "create") {
  //       clearInterval(intervalId);
  //       if (id) {
  //         setId(null);
  //       }
  //       return;
  //     }
  //     if (id) {
  //       clearInterval(intervalId);
  //       return;
  //     }
  //     getIdFromParams();
  //   }, 1000);
  //   setisCurrentPage(currentPage);
  //   return () => clearInterval(intervalId);
  // }, [currentPage]);
  return (
    <AppLayout>
      <RequestPage />
      {/* {isCurrentPage === "validate" || id ? (
        <ValidateRequestPage id={id as string} />
      ) : (
        <CreateRequestPage />
      )} */}
    </AppLayout>
  );
}
export default Page;
