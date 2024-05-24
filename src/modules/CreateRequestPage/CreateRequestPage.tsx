import { PageHeader } from "@/components/PageHeader";
import { Box } from "@mui/material";
import { PannelArea } from "../PannelArea";
import { isDemoMode, isPilotMode } from "@/utils/constants";
import { Loader } from "@/components/Loader";
import { useAppSelector } from "@/libs/redux/hooks";
import { getConsoleMessages, getIsLoadingPrompt } from "@/libs/redux/features/isLoadingRequest";

const CreateRequestPage = () => {
  const ConsoleMessages = useAppSelector(getConsoleMessages);
  const isLoadingPrompt = useAppSelector(getIsLoadingPrompt);
  // console.log('Can you retrieve a list of products with current inventory levels below the threshold for reorder, as well as the last date inventory levels were at or above threshold. Include the reorder quantity as well.'.replace(/ /g, '').toLowerCase(),'result');
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
            <PannelArea />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CreateRequestPage;
