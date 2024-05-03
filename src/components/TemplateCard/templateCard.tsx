import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC } from "react";
import { TemplateCardTypes } from "@/utils/types";

interface TemplateCardProps {
  card: TemplateCardTypes;
  index: number;
}

const TemplateCard: FC<TemplateCardProps> = ({ card, index }) => {
  return (
    <Box key={index} mt={index === 0 ? "" : "1rem"}>
      <Paper
        variant="light-border"
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          border: 0,
          borderRadius: "8px",
        }}
      >
        {/* Layout Conatiner */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          borderRadius={"8px"}
        >
          <Image src={card.image} alt="pic" width={64} height={64} />
          {/* Description */}
          <Box display={"flex"} flexDirection={"column"}>
            <Typography variant="text-md-regular">{card.heading}</Typography>
            <Typography variant="text-xs-regular">{card.subHeading}</Typography>
            <Typography variant="text-xs-regular">
              {card.subHeading2}
            </Typography>
          </Box>
        </Box>
        <Icon icon="actions" width={42} height={24} />
      </Paper>
    </Box>
  );
};

export default TemplateCard;
