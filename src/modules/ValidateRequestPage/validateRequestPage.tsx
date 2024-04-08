import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

import { PannelArea } from "../../modules/PannelArea";
import TopNavBar from "@/components/TopNavBar/topNavBar";
import { PageHeader } from "@/components/PageHeader";

const ValidateRequestPage: FC = () => {
  const content = {
    response:
      "The data request will give you transaction level data (from the TXN_SZNAL table) for the past 52 weeks, ending March 15, 2024,  grouped by week and by Store ID. It only covers product SKUs that include Flyease technology, which is determined from INT DB for Product ID values 1234 and 5678.",
    original:
      "Can I get data to understand how Flyease technology products have been performing this past year? I want to be able to pivot by SKU or by store, to understand transactional data by week.",
  };
  return (
    <Box
      sx={{
        marginLeft: "240px",
        minHeight: "100vh",
      }}
    >
      <TopNavBar />
      <Box
        sx={{
          padding: "1rem 2rem 1rem",
        }}
      >
        <PageHeader type="Validate" />
        <PannelArea content={content} />
      </Box>
    </Box>
  );
};

export default ValidateRequestPage;
