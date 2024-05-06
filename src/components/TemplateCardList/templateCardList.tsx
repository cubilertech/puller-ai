import { ACTIVE_TYPES, CURRENT_MODE, MODES } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { palette } from "@/theme/Palette";
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
        height: "94%",
        scrollbarWidth: "none",
      }}
    >
      {filteredData.length <= 0 ? (
        <Typography
          variant="text-lg-bold"
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            color: palette.opacity.lightGray,
            display: "flex",
            alignItems: "center",
          }}
        >
          No Pulls Data
        </Typography>
      ) : (
        filteredData.map((card, index) => (
          <TemplateCard key={index} index={index} card={card} />
        ))
      )}
    </Box>
  );
};

export default TemplateCardList;
