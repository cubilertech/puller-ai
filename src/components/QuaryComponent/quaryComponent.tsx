import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { palette } from "@/theme/Palette";
import { Button } from "../Button";
import { CustomLink } from "../Link";
import { FC } from "react";
import { useAppSelector } from "@/libs/redux/hooks";
import { getIsLoadingRequest } from "@/libs/redux/features/isLoadingRequest";

interface QueryComponentProps {
  content: {
    response: string;
    original: string;
  };
  handleUpdate: () => void;
  isLoading: boolean;
}

const QueryComponent: FC<QueryComponentProps> = ({
  content,
  isLoading,
  handleUpdate,
}) => {
  const isLoadingPage = useAppSelector(getIsLoadingRequest);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      {/* origninal text */}
      <Paper
        variant="dark-border"
        sx={{
          border: `1px solid ${palette.color.gray[700]}`,
          height: "fit-content",
          margin: 0,
          padding: 1,
          width: "100%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // animation: "fallingEffect 0.5s ease forwards",
          position: "relative",
          zIndex: 10,
          // opacity: 0,
        }}
      >
        <Box
          sx={{
            width: "98%",
            m: "auto",
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              width: "80%",
            }}
          >
            <Typography variant="text-xs-bold">Original</Typography>
            {isLoading || isLoadingPage ? (
              <Skeleton style={{ width: "90%", margin: "auto" }} />
            ) : (
              <Typography
                className="animated-genrated-text"
                variant="text-xs-regular"
                color={palette.color.gray[300]}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {content?.original}
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "122px", position: "relative" }}>
            <Button
              sx={{
                width: "122px",
                height: "38px !important",
              }}
              disabled={isLoading ? isLoading : isLoadingPage}
              onClick={handleUpdate}
              label="Run Query"
              variant="contained"
            />
          </Box>
        </Box>
      </Paper>
      {/* down text */}
      <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
        {isLoadingPage ? (
          <Skeleton style={{ width: "90%", margin: "auto" }} />
        ) : (
          <Typography variant="text-sm" color={palette.color.gray[300]}>
            This query is estimated to take X minutes and will be approximately
            X size.
            <span style={{ textDecoration: "underline" }}>
              <CustomLink color="#90919b" variant="simple" href="#">
                Need to optimize?
              </CustomLink>
            </span>
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default QueryComponent;
