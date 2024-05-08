// import { ACTIVE_TYPES } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
// import { TEMPLATE_PRIVATE_DATA, TEMPLATE_PUBLIC_DATA } from "@/utils/data";
import { TemplateCard } from "../TemplateCard";
import { Prompt } from "@/utils/types";
import { palette } from "@/theme/Palette";
interface TemplateCardListProps {
  isActive: string;
  pulls: Prompt[];
}

const TemplateCardList: FC<TemplateCardListProps> = ({ isActive, pulls }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "94%",
        scrollbarWidth: "none",
      }}
    >
      {pulls?.length <= 0 ? (
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
          No {isActive} pulls available.
        </Typography>
      ) : (
        pulls?.map((pull, index) => (
          <TemplateCard key={index} index={index} card={pull} />
        ))
      )}
    </Box>
  );
};

export default TemplateCardList;
