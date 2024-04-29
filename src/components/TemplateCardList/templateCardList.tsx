import { ACTIVE_TYPES } from "@/utils/constants";
import { Box } from "@mui/material";
import { FC } from "react";
import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
interface TemplateCardListProps {
  isActive: string;
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "94%",
        scrollbarWidth: "none",
      }}
    >
      {(isActive === ACTIVE_TYPES.PRIVATE
        ? TEMPLATE_PRIVATE_DATA
        : TEMPLATE_PUBLIC_DATA
      ).map((card, index) => (
        <TemplateCard key={index} index={index} card={card} />
      ))}
    </Box>
  );
};

export default TemplateCardList;
