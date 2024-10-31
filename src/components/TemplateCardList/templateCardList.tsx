// import { ACTIVE_TYPES } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
// import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { Prompt, Query } from "@/utils/types";
import { palette } from "@/theme/Palette";
import { PULLS_TYPES } from "@/utils/constants";
import TemplateCardPulls from "../TemplateCardPulls/templateCard";
interface TemplateCardListProps {
  isActive: string;
  pulls: Query[];
  prompts: Prompt[];
}

const TemplateCardList: FC<TemplateCardListProps> = ({
  isActive,
  pulls,
  prompts,
}) => {
  console.log(pulls, "pulls");
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "94%",
        scrollbarWidth: "none",
      }}
    >
      {(isActive === PULLS_TYPES.PULLS && pulls?.length <= 0) ||
      (isActive === PULLS_TYPES.PROMPTS && prompts?.length <= 0) ? (
        <Typography
          sx={{
            color: palette.color.gray[500],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          variant="text-lg-regular"
        >
          No {isActive} available.
        </Typography>
      ) : isActive === PULLS_TYPES.PROMPTS ? (
        prompts?.map((pull, index) => (
          <TemplateCard key={index} index={index} card={pull} />
        ))
      ) : (
        pulls?.map((pull, index) => (
          <TemplateCardPulls key={index} index={index} card={pull} />
        ))
      )}
    </Box>
  );
};

export default TemplateCardList;
