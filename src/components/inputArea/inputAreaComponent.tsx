import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { FC } from "react";
import { CustomInput } from "@/modules/PannelArea/input";

interface InputAreaComponentPorps {
  handleValidate: () => void;
}

const InputAreaComponent: FC<InputAreaComponentPorps> = ({
  handleValidate,
}) => {
  return (
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
            sx={{
              padding: "0.5rem ",
              margin: 0,
              minHeight: "5rem",
              display: "flex",
              maxHeight: "15rem",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                display: "contents",
                maxHeight: "10rem",
                overflow: "auto",
              }}
            >
              <CustomInput />
            </span>
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
                onClick={() => handleValidate()}
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
  );
};

export default InputAreaComponent;
