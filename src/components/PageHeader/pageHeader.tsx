"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Button } from "../Button";
import { usePathname } from "next/navigation";
import { PagesType } from "@/utils/constants";

const PageHeader: FC = () => {
  const route = usePathname();
  const routeParts = route.replace(/^\//, "").split("/");
  const firstRoute = routeParts[0];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: "white",
          // px: 4,
        }}
      >
        <Typography variant="display-xs-semibold">
          {firstRoute === PagesType.CREATE_REQUEST
            ? "Create a Request"
            : firstRoute === PagesType.RECENT_REQUESTS
            ? "Recent Requests"
            : firstRoute === PagesType.YOUR_RESULTS
            ? "Your Results"
            : firstRoute === PagesType.PREVIEW_DATA
            ? "Preview Data"
            : "Create a Request"}
        </Typography>

        <Box>
          {firstRoute === PagesType.CREATE_REQUEST || "" ? (
            <Box sx={{ width: "242px" }}>
              <Button
                variant="outlined"
                size="medium"
                fullWidth
                label="Request History"
              />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default PageHeader;
