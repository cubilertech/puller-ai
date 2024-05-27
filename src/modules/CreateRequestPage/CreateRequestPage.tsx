import { PageHeader } from "@/components/PageHeader";
import { Box, Typography } from "@mui/material";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { palette } from "@/theme/Palette";
import { FC, useMemo, useState } from "react";
import { Prompt } from "@/utils/types";
import { LatestPullesCard } from "@/components/Latestpulles-Card";
import { motion } from "framer-motion";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { AlertModal } from "@/modals/AlertModal";
import "./CreateRequestPage.css";
import { LatestPullsData } from "@/utils/data";
interface Props {
  list: Prompt[] | null | undefined;
  setRequestQuery: (query: string) => void;
  requestQuery: string;
  handleSubmitPrompt: any;
  submitPromptLoading: boolean;
}
const CreateRequestPage: FC<Props> = ({
  list,
  setRequestQuery,
  requestQuery,
  handleSubmitPrompt,
  submitPromptLoading,
}) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const promptList = useMemo(() => {
    return isPilotMode ? LatestPullsData : list ? list : [];
  }, [list]);

  const handlePrompt = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const handleSource = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    }
  };
  const CompanyName = localStorage.getItem("companyName");
  return (
    <>
      <Box sx={{ px: 2, pt: 1, m: "auto" }}>
        <PageHeader
          title="Create a Request"
          buttons={
            isDemoMode
              ? [
                  {
                    label: "Request History",
                    variant: "request-history",
                  },
                ]
              : undefined
          }
        />
        <Box
          sx={{
            pt: isPilotMode ? "55px" : 2,
            width: "100%",
            m: "auto",
            height: isPilotMode ? "calc(100vh - 120px)":  "calc(100vh - 150px)",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography className="animated-text animated-left-right-text">
                Hello, {CompanyName ? CompanyName : "Name"}{" "}
              </Typography>
              <Typography
                sx={{
                  color: palette.color.gray[600],
                  fontSize: "50px",
                  fontWeight: 500,
                }}
              >
                Create a pull request to get started
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                gap: 2,
                overflow: "auto",
                scrollbarWidth: "none",
              }}
            >
              {promptList.map((item, i) => (
                <motion.div
                  key={`motion-div-${i}`}
                  animate={{ opacity: [0, 1] }}
                  transition={{
                    duration: i === 0 ? 0.5 : i,
                    ease: "easeInOut",
                  }}
                >
                  <LatestPullesCard
                    key={i}
                    query={item.query}
                    onClick={() => setRequestQuery(item.query as string)}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>

          <CreateInputAreaComponent
            handlePrompt={handlePrompt}
            handleSource={handleSource}
            handleValidate={handleSubmitPrompt}
            onChangeInput={(e) => setRequestQuery(e.target.value)}
            isLoading={submitPromptLoading}
            value={requestQuery}
          />
          <AlertModal
            open={isOpenAlert}
            handleClose={() => setIsOpenAlert(false)}
          />
          {/* <PannelArea /> */}
        </Box>
      </Box>
    </>
  );
};

export default CreateRequestPage;
