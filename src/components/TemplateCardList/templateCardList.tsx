import { ACTIVE_TYPES, CURRENT_MODE, MODES } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { palette } from "@/theme/Palette";
interface TemplateCardListProps {
  isActive: string;
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive }) => {
  const data =
    isActive === ACTIVE_TYPES.PRIVATE
      ? TEMPLATE_PRIVATE_DATA
      : CURRENT_MODE === MODES.PILOT
        ? undefined
        : TEMPLATE_PUBLIC_DATA;
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "94%",
        scrollbarWidth: "none",
      }}
    >
      {!data ? (
        <Typography
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            color: palette.opacity.lightGray,
            display: "flex",
            alignItems: "center",
          }}
        >
          No Pulls Found
        </Typography>
      ) : (
        data.map((card, index) => (
          <TemplateCard key={index} index={index} card={card} />
        ))
      )}
    </Box>
  );
};

export default TemplateCardList;
