"use client";
import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Button } from "../Button";
import { palette } from "@/theme/Palette";
import CustomLink from "../Link/link";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import SQL_EditorModal from "@/modals/sql_EditorModal/sqlEditorModal";

interface PageHeaderProps {
  type:
    | "Recent"
    | "Results"
    | "create"
    | "Validate"
    | "Preview"
    | "Template"
    | "graph";
}

const PageHeader: FC<PageHeaderProps> = ({ type }) => {
  const [openSQL_Editor, setopenSQL_Editor] = useState(false);

  const handleOpenCloseSQL_Editor = () => {
    setopenSQL_Editor(!openSQL_Editor);
  };
  switch (type) {
    case "Recent":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Recent Requests
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Results":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Your Results
          </Typography>
          <Box></Box>
        </Box>
      );
    case "create":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Create a Request
          </Typography>
          <CustomLink href="/request/recent">
            <Box width={242}>
              <Button variant="outlined" fullWidth label="Request History" />
            </Box>
          </CustomLink>
        </Box>
      );
    case "Validate":
      return (
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="display-xs-semibold"
              color={palette.base.white}
            >
              Validate Request
            </Typography>
            <Box pr={5}>
              <CustomButton
                variant="rounded-SQL"
                onClick={() => handleOpenCloseSQL_Editor()}
              />
            </Box>
          </Box>
          <SQL_EditorModal
            open={openSQL_Editor}
            handleClose={handleOpenCloseSQL_Editor}
            code={`
            SELECT 
            Store_ID, 
            DATE_TRUNC(TXN_DATE, 'week') AS Week, 
            SUM(TXN_AMT) AS Total_Sales
          FROM 
            TXN_SZNAL
          WHERE 
            PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
            TXN_DATE <= DATE_TRUNC(CURRENT_DATE(), 'week')
          GROUP BY 
            Store_ID, 
            Week
          ORDER BY 
            Week, 
            Store_ID;
          
          `}
          />
        </>
      );
    case "Preview":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Preview Data
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Template":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Templates
          </Typography>
          <Box></Box>
        </Box>
      );
    case "graph":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Graph
          </Typography>
          <Box></Box>
        </Box>
      );
      break;
  }
};

export default PageHeader;
