"use client";
import { Box, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Button } from "../Button";
import { palette } from "@/theme/Palette";
import CustomLink from "../Link/link";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import SQL_EditorModal from "@/modals/sql_EditorModal/sqlEditorModal";
import { Icon } from "../Icon";
import { useRouter } from "next/navigation";
import GraphModal from "@/modals/graphModals/graphModal";
import { Tooltip } from "../Tooltip";
import { PageHeaderVariants } from "@/utils/types";

interface PageHeaderProps {
  variant: PageHeaderVariants;
}

const PageHeader: FC<PageHeaderProps> = ({ variant }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openSQL_Editor, setopenSQL_Editor] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  const router = useRouter();

  const handleOpenCloseSQL_Editor = () => {
    setopenSQL_Editor(!openSQL_Editor);
  };
  const handleOpenGraph = () => {
    setOpenGraph(!openGraph);
  };
  switch (variant) {
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
          <Typography
            variant="display-xs-semibold"
            color={palette.base.white}
            sx={{
              fontFamily: "Inter",
            }}
          >
            Create a Request
          </Typography>
          <CustomLink href="/request/recent">
            <Box width={242}>
              <CustomButton variant="request-history" text="Request History" />
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
            <Box pr={5} display={"flex"} gap={"1rem"}>
              <CustomButton
                text="Graph"
                variant="rounded-SQL"
                onClick={() => handleOpenGraph()}
              />
              <CustomButton
                text="SQL"
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
          <GraphModal open={openGraph} handleClose={() => handleOpenGraph()} />
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
            Pulls Inventory
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Retrivers":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Tooltip variant="status">
              <Typography
                variant="display-xs-semibold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
                color={palette.base.white}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                Retrievers <Icon icon={isHovered ? "infoHover" : "info"} />
              </Typography>
            </Tooltip>
          </Box>
          <Box>
            <Button
              sx={{
                width: 220,
              }}
              variant="outlined"
              label="Create Retriever"
              onClick={() => router.push("/retrievers/new")}
            />
          </Box>
        </Box>
      );
    case "New Retriver":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="display-xs-bold"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Select New Retriever Type
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Select Retriver":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Select a Retriever
          </Typography>
          <Box>
            <Button
              sx={{
                width: 220,
              }}
              variant="outlined"
              label="Continue"
              onClick={() => router.push("/alerts/create")}
            />
          </Box>
        </Box>
      );

    case "Alerts":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Alerts
          </Typography>
          <Box>
            <Button
              variant="outlined"
              label="Create Alert"
              sx={{
                width: 220,
              }}
              onClick={() => router.push("/alerts/select-retriever")}
            />
          </Box>
        </Box>
      );
    case "Create Alert":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Create Alert for {`"Retriever 2"`}
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Connect App":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Connect App
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Custom Retrievers":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Custom Retrievers
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Advanced":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Advanced
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Retriever Detail":
      return (
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
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
            color={palette.base.white}
          >
            Alerts
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box width={180}>
              <Button label="Add Context" variant="outlined" fullWidth />
            </Box>
            <Box width={180}>
              <Button label="Request Access" variant="outlined" fullWidth />
            </Box>
            <Box width={180}>
              <Button label="Create Alert" variant="outlined" fullWidth />
            </Box>
          </Box>
        </Box>
      );
  }
};
export default PageHeader;
