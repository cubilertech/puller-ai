import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { PannelArea } from "../PannelArea";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { Loader } from "@/components/Loader";
import { useAppSelector } from "@/libs/redux/hooks";
import { getConsoleMessages, getIsLoadingPrompt } from "@/libs/redux/features/isLoadingRequest";

const CreateRequestPage = () => {
  const ConsoleMessages = useAppSelector(getConsoleMessages);
  const isLoadingPrompt = useAppSelector(getIsLoadingPrompt);
  return (
    <>
      {isLoadingPrompt ? (
        <Loader
          type="Processing"
          variant="pageLoader"
          message={ConsoleMessages}
        />
      ) : (
        <Box sx={{ px: 2, pt: 1, m: "auto" }}>
          <PageHeader
            title="Create a Request"
            buttons={
              CURRENT_MODE === MODES.DEMO
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
              pt: CURRENT_MODE === MODES.PILOT ? "55px" : 2,
              width: "100%",
              m: "auto",
            }}
          >
            <PannelArea />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CreateRequestPage;
