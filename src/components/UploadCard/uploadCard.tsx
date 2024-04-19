import { Box, Divider, Typography } from "@mui/material";
import { Paper } from "../Paper";
import { Icon } from "../Icon";

const UploadCard = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
      type="light-border"
    >
      <Typography variant="text-xxs-regular">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        justo ipsum. Sed accumsan quam vitae est varius fringilla. Pellentesque
        placerat vestibulum lorem sed porta. Nullam mattis tristique iaculis.
        Nullam pulvinar sit amet risus pretium auctor. Etiam quis massa
        pulvinar, aliquam quam vitae, tempus sem. Donec elementum pulvinar odio.
      </Typography>
      <Divider
        sx={{
          my: "10px",
        }}
      />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Icon icon="folder" width={24} height={24} />
          <Typography variant="text-sm-medium">Cl_insight_2021.pdf</Typography>
        </Box>
        <Typography variant="text-sm-medium">(10mb)</Typography>
      </Box>
    </Paper>
  );
};

export default UploadCard;
