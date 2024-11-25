import { Box, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { Paper } from "../Paper";
import { FC } from "react";
import { Query } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/libs/redux/hooks";
import {
  UpdateCurrentPage,
  UpdateIsLoadingRequest,
  UpdatePromptValue,
} from "@/libs/redux/features/isLoadingRequest";
import { formatDate } from "@/utils/common";
import { isPilotMode } from "@/utils/constants";
interface TemplateCardPullsProps {
  card: Query;
  index: number;
}

const TemplateCardPulls: FC<TemplateCardPullsProps> = ({ card, index }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const id = card?.prompt?.includes("#")
    ? card?.prompt?.split("#")?.[1]
    : card?.id;
  const handleClickTemplate = () => {
    if (projectId && orgId) {
      router.push(
        `/request/results/${id}?projectId=${projectId}&orgId=${orgId}`
      );
    } else if (isPilotMode) {
      router.push(`/request/results/${id}`);
    } else {
      router.push(`/request?id=${id}`);
    }

    dispatch(UpdateCurrentPage("validate"));
    dispatch(UpdateIsLoadingRequest(true));
    dispatch(UpdatePromptValue(card.message));
  };

  const formatedTimeStamp = isPilotMode
    ? formatDate(card.timestamp as number)
    : id;
  const tableName = card.results[card.results.length - 1]?.table;
  const status =
    card.status === "complete"
      ? "completed"
      : card.status === "pending"
        ? "pending"
        : "info";
  return (
    <Box
      key={index}
      mt={index === 0 ? "" : "1rem"}
      onClick={() => handleClickTemplate()}
      sx={{ cursor: "pointer" }}
    >
      <Paper
        variant="light-border"
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          border: 0,
          borderRadius: "5px",
        }}
      >
        {/* Layout Conatiner */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          borderRadius={"5px"}
        >
          <Image
            src="/Images/blank-square.svg"
            alt="pic"
            width={64}
            height={64}
          />

          {/* Description */}
          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              variant="text-md-regular"
              sx={{ textTransform: "capitalize" }}
            >
              {tableName}{" "}
              <Typography
                variant="text-sm-regular"
                component={"span"}
                sx={{ textTransform: "capitalize" }}
              >
                {formatedTimeStamp}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", height: "96%" }}>
            <Chip
              label={status}
              sx={{
                textTransform: "capitalize",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              size="small"
              variant="outlined"
              color={
                card.status === "complete"
                  ? "success"
                  : card.status === "pending"
                    ? "warning"
                    : "default"
              }
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TemplateCardPulls;
