"use client";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { RetriverCard } from "@/components/RetriverCard";
import RetriverNewCard from "@/components/RetriverCard/retrieverNewCard";
import { useGetClientInfo } from "@/hooks/useMeta";
import { useGetAllRetriever } from "@/hooks/useRetriever";
import { AlertModal } from "@/modals/AlertModal";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { RetrieverIconsTypes, StatusTypes } from "@/utils/types";
import { Box } from "@mui/material";
import { useField } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RetrieversPage = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const [isLoading, setIsLoading] = useState(true);
  const handleSingleAlert = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const {
    data: Retrievers,
    isFetched: isFetchedRetrivers,
    refetch: retchRetrievers,
  } = useGetAllRetriever();
  const {
    data: MetaData,
    refetch: refetchClient,
    isFetched: isFetchedClients,
  } = useGetClientInfo();
  useEffect(() => {
    if (projectId && orgId && isPilotMode) {
      refetchClient();
    } else if (isDemoMode) {
      retchRetrievers();
    }
  }, [projectId, orgId, retchRetrievers]);

  useEffect(() => {
    if (isFetchedRetrivers || isFetchedClients) {
      setIsLoading(false);
    }
  }, [isFetchedRetrivers, isFetchedClients]);

  // Sort the array based on the timestamp in descending order
  const sortedItems = Retrievers?.sort((a, b) => b.timestamp - a.timestamp);
  console.log(MetaData, "MetaData");
  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader
        title="Retrievers"
        buttons={[
          {
            label: "Create Retriever",
            variant: "outlined",
            href:
              projectId && orgId
                ? `/retrievers/new?projectId=${projectId}&orgId=${orgId}`
                : `/retrievers/new`,
            width: 220,
          },
        ]}
      />
      {/* Grid Layout */}
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader type="Loading" variant="pageLoader" />
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 610px)",
            alignItems: "flex-start",
            justifyItems: "center",
            width: "100%",
            height: "fit-content",
            gap: "1rem",
            justifyContent: "space-between",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <RetriverNewCard
            database={MetaData?.connection.database as string}
            icon={"clickstream" as RetrieverIconsTypes}
            models={MetaData?.models}
            schema={MetaData?.connection?.schema}
            variables={MetaData?.variables}
            type={MetaData?.connection?.type}
            status={
              MetaData?.connection?.status
                ? ("live" as StatusTypes)
                : ("blocked" as StatusTypes)
            }
            onClick={() => handleSingleAlert()}
            title={MetaData?.name as string}
          />
        </Box>
      )}
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default RetrieversPage;
