// import { ACTIVE_TYPES } from "@/utils/constants";
import { Box } from "@mui/material";
import { FC } from "react";
// import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { Prompt } from "@/utils/types";
interface TemplateCardListProps {
  isActive: string;
  pulls: Prompt[];
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive, pulls }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "94%",
        scrollbarWidth: "none",
      }}
    >
      {pulls?.length <= 0
        ? `No ${isActive} pulls available.`
        : pulls?.map((pull, index) => (
            <TemplateCard key={index} index={index} card={pull} />
          ))}
    </Box>
  );
};

export default TemplateCardList;
