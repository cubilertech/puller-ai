import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Paper } from "@/components/Paper";
import InputArea from "@/components/inputArea/inputArea";
import { Box, Input, Typography } from "@mui/material";

const CreateAlertPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "flex-end",
      }}
    >
      <PageHeader type="Create Alert" />

      <Box width={"100%"}>
        <Paper
          sx={{
            width: "100%",
            minHeight: "15rem",
            padding: "2rem",
            border: "2px solid rgba(196, 196, 196, 0.6) !important",
          }}
          type="light-border"
        >
          <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
            <Typography variant="text-md-semibold">Alert Name 1</Typography>
            <Paper
              type="light-border"
              sx={{
                minHeight: "5rem",
                padding: "0.5rem 1rem",
                display: "flex",
                maxHeight: "15rem",
                margin: 0,
                background: "transparent !important ",
                border: "2px solid rgba(196, 196, 196, 0.6) !important",
              }}
            >
              <Input
                multiline
                fullWidth
                disableUnderline
                placeholder="Type your data request (prompt) here..."
                sx={{
                  boxSizing: "border-box",
                  minHeight: "100%",
                  alignItems: "flex-start",
                  overflowY: "auto",
                }}
              />
            </Paper>
            <Typography
              variant="text-sm"
              sx={{
                marginLeft: "10px",
              }}
            >
              We’ll set up an alert for selected Retriever, “Retriever 2”.
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box width={180}>
        <Button variant="outlined" label="Create Alert" fullWidth />
      </Box>
    </Box>
  );
};

export default CreateAlertPage;
