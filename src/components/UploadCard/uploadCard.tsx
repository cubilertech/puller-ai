import { Box, Typography, useMediaQuery } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";
import { Divider } from "../Divider";

const UploadCard = () => {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        borderRadius: "5px",
      }}
      variant="light-border"
    >
      <Typography variant="text-xxs-regular" mb={1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque
        placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
        Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa
        pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
      </Typography>
      <Divider
        type={"light"}
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={1}
        sx={{ alignItems: "center", pt: 1 }}
      >
        <Box
          display={"flex"}
          sx={{ alignItems: { md: "center", xs: "flex-start" } }}
          gap={isMobile ? "0.5rem" : "0.8rem"}
        >
          <Box mt={"2px"}>
            <Icon
              icon="folder"
              width={isMobile ? 18 : 24}
              height={isMobile ? 18 : 24}
            />
          </Box>

          <Typography
            variant={isMobile ? "text-xs-medium" : "text-sm-medium"}
            sx={{ minWidth: "80px", wordWrap: "break-word" }}
          >
            Cl_insight_2021.pdf
          </Typography>
        </Box>

        <Typography variant={isMobile ? "text-xs-medium" : "text-sm-medium"}>
          (10mb)
        </Typography>
      </Box>
    </Paper>
  );
};

export default UploadCard;
