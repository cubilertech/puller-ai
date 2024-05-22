import { PageHeader } from "@/components/PageHeader";
import { Box, Typography } from "@mui/material";
import { PannelArea } from "../PannelArea";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { Loader } from "@/components/Loader";
import { useAppSelector } from "@/libs/redux/hooks";
import {
  getConsoleMessages,
  getIsLoadingPrompt,
} from "@/libs/redux/features/isLoadingRequest";
import { palette } from "@/theme/Palette";
import { FC, useMemo, useState } from "react";
import { Prompt } from "@/utils/types";
import { LatestPullesCard } from "@/components/Latestpulles-Card";
import { motion } from "framer-motion";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { AlertModal } from "@/modals/AlertModal";

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
  submitPromptLoading
}) => {
  //   const ConsoleMessages = useAppSelector(getConsoleMessages);
  //   const isLoadingPrompt = useAppSelector(getIsLoadingPrompt);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const promptList = useMemo(() => {
    return list ? list : [];
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
                    href: "/request/recent",
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
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography className="animated-text animated-left-right-text">
                Hello, Abdul{" "}
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
                  animate={{ y: [-240, 0] }}
                  transition={{
                    duration: i === 0 ? 1 : i,
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
            onChangeInput={(e) => setRequestQuery(e.current.target)}
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
