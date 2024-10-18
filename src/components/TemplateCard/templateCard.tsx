import { Box, Typography } from "@mui/material";
import Image from "next/image";
// import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC, useMemo } from "react";
import { Prompt } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/libs/redux/hooks";
import {
  UpdateCurrentPage,
  UpdateIsLoadingRequest,
  UpdatePromptValue,
} from "@/libs/redux/features/isLoadingRequest";
import {
  replaceBrandName,
  replaceIdWithVariableInDescription,
} from "@/utils/common";

interface TemplateCardProps {
  card: Prompt;
  index: number;
}

const TemplateCard: FC<TemplateCardProps> = ({ card, index }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const orgId = searchParams.get("orgId");
  const id = card?.id?.includes("#") ? card?.id?.split("#")?.[1] : card?.id;
  const handleClickTemplate = () => {
    if (projectId && orgId) {
      router.push(`/request?id=${id}&projectId=${projectId}&orgId=${orgId}`);
    } else {
      router.push(`/request?id=${id}`);
    }

    dispatch(UpdateCurrentPage("validate"));
    dispatch(UpdateIsLoadingRequest(true));
    dispatch(UpdatePromptValue(card.message));
  };
  const companyName = localStorage.getItem("companyName");
  const description = useMemo(() => {
    const replaceBrand = replaceBrandName(
      { description: card.description },
      companyName as string
    );
    return replaceIdWithVariableInDescription(
      {
        ...card,
        description: replaceBrand,
      } as Prompt,
      companyName as string
    );
  }, [card]);
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
            <Typography variant="text-md-regular">Template {id}</Typography>
            <Typography
              variant="text-xs-regular"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
            {/* <Typography variant="text-xs-regular">
              {card.subHeading2}
            </Typography> */}
          </Box>
        </Box>
        {/* <Icon icon="actions" width={42} height={24} /> */}
      </Paper>
    </Box>
  );
};

export default TemplateCard;
