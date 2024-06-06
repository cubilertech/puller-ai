"use client";
import { CustomLink } from "@/components/Link";
import { PageHeader } from "@/components/PageHeader";

import { RectangleCard } from "@/components/RectangleCard";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const SelectNewRetriverPage = () => {
  const router = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const handleApi = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else {
      if (linkRef.current) {
        linkRef.current.click();
      }
    }
  };

  return (
    <>
      <Box p={"1rem"} display={"flex"} flexDirection={"column"} gap={"2rem"}>
        <PageHeader title="Select New Retriever Type" />
        {/*Layout Container */}
        <Box
          display={"flex"}
          gap={"2rem"}
          flexDirection={{ md: "row", xs: "column" }}
        >
          <RectangleCard
            icon="connectApps"
            title="Connect Apps"
            onClick={() => router.push("/retrievers/connect")}
          />
          <CustomLink
            href={isPilotMode ? "" : "https://your-api-url.com"}
            target={isPilotMode ? "" : "_blank"}
            ref={linkRef}
            style={{ width: "100%" }}
          >
            <RectangleCard
              icon="apiKey"
              title="Get API Key"
              onClick={() => handleApi()}
            />
          </CustomLink>
          <RectangleCard
            icon="upload"
            title="Upload Data"
            onClick={() => router.push("/retrievers/upload")}
          />
        </Box>
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};

export default SelectNewRetriverPage;
