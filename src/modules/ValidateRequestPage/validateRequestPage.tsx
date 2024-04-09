"use client";
import { Box } from "@mui/material";
import React, { FC, ReactNode, useState } from "react";

import { PannelArea } from "../../modules/PannelArea";
import { PageHeader } from "@/components/PageHeader";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

const ValidateRequestPage: FC = () => {
  const route = useRouter();
  const [isProccessing, setisProccessing] = useState(false);

  const handleUpdate = () => {
    setisProccessing(true);

    setTimeout(() => {
      setisProccessing(false);
      route.push("/results");
    }, 8000);
  };
  const content = {
    response:
      "The data request will give you transaction level data (from the TXN_SZNAL table) for the past 52 weeks, ending March 15, 2024,  grouped by week and by Store ID. It only covers product SKUs that include Flyease technology, which is determined from INT DB for Product ID values 1234 and 5678.",
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };
  return (
    <>
      {isProccessing ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "60%", height: "70%" }}>
            <Loader varient="paper" />
          </Box>
        </Box>
      ) : (
        <Box sx={{ px: 1.2, pt: 1 }}>
          <PageHeader type="Validate" />
          <Box sx={{ width: "97%", m: "auto", pt: 2 }}>
            <PannelArea content={content} handleUpdate={() => handleUpdate()} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ValidateRequestPage;
