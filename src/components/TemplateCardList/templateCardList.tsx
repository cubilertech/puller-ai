import { ACTIVE_TYPES } from "@/utils/constants";
import { Box } from "@mui/material";
import { FC } from "react";
import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { useAppSelector } from "@/libs/redux/hooks";
import { getSearchQuery } from "@/libs/redux/features/searchbar";
interface TemplateCardListProps {
  isActive: string;
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive }) => {
  const query = useAppSelector(getSearchQuery);

  const filteredData = (
    isActive === ACTIVE_TYPES.PRIVATE
      ? TEMPLATE_PRIVATE_DATA
      : TEMPLATE_PUBLIC_DATA
  ).filter((item) => item.heading.toLowerCase().includes(query.toLowerCase()));
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "94%",
        scrollbarWidth: "none",
      }}
    >
      {filteredData.map((card, index) => (
        <TemplateCard key={index} index={index} card={card} />
      ))}
    </Box>
  );
};

export default TemplateCardList;
