"use client";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { RetriverCard } from "@/components/RetriverCard";
import { useGetAllRetriever } from "@/hooks/useRetriever";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { RetrieverIconsTypes, StatusTypes } from "@/utils/types";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RetrieversPage = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const handleSingleAlert = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const {
    data: Retrievers,
    isLoading: LoadingRetrivers,
    refetch: FetchRetrievers,
  } = useGetAllRetriever();
  useEffect(() => {
    FetchRetrievers();
  }, [FetchRetrievers]);

  // Sort the array based on the timestamp in descending order
  const sortedItems = Retrievers?.sort((a, b) => b.timestamp - a.timestamp);

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
      {LoadingRetrivers ? (
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
            gridTemplateColumns: "repeat(auto-fit, 210px)",
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
          {sortedItems?.map((card, i) => (
            <RetriverCard
              description={card.description}
              icon={card.icon as RetrieverIconsTypes}
              status={card.status as StatusTypes}
              onClick={() => handleSingleAlert()}
              title={card.title}
              key={i}
            />
          ))}
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
