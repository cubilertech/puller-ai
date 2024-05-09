import { Box, Typography } from "@mui/material";
import Image from "next/image";
// import { Icon } from "../Icon";
import { Paper } from "../Paper";
import { FC } from "react";
import { Prompt } from "@/utils/types";
import { useRouter } from "next/navigation";

interface TemplateCardProps {
  card: Prompt;
  index: number;
}

const TemplateCard: FC<TemplateCardProps> = ({ card, index }) => {
  const router = useRouter();
  const id = card?.id?.includes("#") ? card?.id?.split("#")?.[1] : card?.id;
  return (
    <Box
      key={index}
      mt={index === 0 ? "" : "1rem"}
      onClick={() => router.push(`/request/${id}/validate`)}
      sx={{ cursor: "pointer" }}
    >
      <Paper
        variant="light-border"
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          border: 0,
          borderRadius: "4px",
        }}
      >
        {/* Layout Conatiner */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          borderRadius={"4px"}
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
            <Typography variant="text-xs-regular">
              {card.description}
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
