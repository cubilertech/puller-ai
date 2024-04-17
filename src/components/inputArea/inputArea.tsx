import { Box, Input } from "@mui/material";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { Icon } from "../Icon";

const InputArea = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mt: 2,
          height: "65vh",
        }}
      >
        <Paper
          type="light-border-2"
          sx={{
            flexGrow: "1",
            margin: 0,
            marginBottom: "1rem",
          }}
        ></Paper>
        <Paper type="light-border">
          <Box
            sx={{
              padding: "8px",
            }}
          >
            <Box
              sx={{
                marginBottom: "0.5rem",
              }}
            >
              <Paper
                type="dark-border"
                sx={{ padding: "0.5rem 1rem 2rem", margin: 0 }}
              >
                <Input
                  multiline
                  fullWidth
                  disableUnderline
                  placeholder="Type your data request (prompt) here..."
                />
              </Paper>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box width={163}>
                  <Button
                    size="small"
                    variant="outlined"
                    label="Prompt"
                    fullWidth
                    endIcon={<Icon icon="plus" height={8} width={8} />}
                  />
                </Box>

                <Box width={82}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Source"
                    endIcon={<Icon icon="minus" height={8} width={8} />}
                  />
                </Box>
              </Box>

              <Box>
                <Box width={155}>
                  <Button
                    fullWidth
                    size="small"
                    variant="contained"
                    label="Validate"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default InputArea;
