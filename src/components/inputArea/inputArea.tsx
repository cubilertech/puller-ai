import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { FC } from "react";
import { CustomInput } from "@/modules/PannelArea/input";

interface InputAreaComponentPorps {
  handleValidate: () => void;
  onChangeInput: (event: any) => any;
  isLoading: boolean;
  value: string;
}

const InputAreaComponent: FC<InputAreaComponentPorps> = ({
  handleValidate,
  onChangeInput,
  isLoading,
  value,
}) => {
  return (
    <Paper variant="light-border">
      <Box
        sx={{
          paddingY: "12px",
          px: "10px",
        }}
      >
        <Box
          sx={{
            marginBottom: "0.8rem",
          }}
        >
          <Paper
            variant="dark-border"
            sx={{
              padding: "0.5rem ",
              m: 0,
              minHeight: "7rem",
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
              <CustomInput
                disabled={isLoading}
                onChange={(event) => onChangeInput(event)}
              />
            </span>
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!value?.length || isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                ml: "4px",
              }}
            >
              <Box width={163}>
                <Button
                  size="small"
                  variant="outlined"
                  label="Prompt"
                  disabled={isLoading}
                  fullWidth
                  endIcon={
                    <Icon
                      icon="plus"
                      height={2}
                      width={8}
                      disabled={isLoading}
                    />
                  }
                />
              </Box>
              <Box width={82}>
                <Button
                  fullWidth
                  size="small"
                  disabled={isLoading}
                  variant="outlined"
                  label="Source"
                  endIcon={
                    <Icon
                      icon="minus"
                      height={2}
                      width={8}
                      disabled={isLoading}
                    />
                  }
                />
              </Box>
            </Box>
          ) : (
            <Box width={163}>
              <Button
                size="small"
                variant="outlined"
                label="Manage Sources"
                disabled={isLoading}
                fullWidth
                endIcon={
                  <Icon
                    icon="minus"
                    height={2}
                    width={8}
                    disabled={isLoading}
                  />
                }
              />
            </Box>
          )}

          {isLoading ? (
            ""
          ) : (
            <Box>
              <Box width={155}>
                <Button
                  onClick={() => handleValidate()}
                  fullWidth
                  size="small"
                  variant="contained"
                  label="Validate"
                  disabled={value.length <= 0}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default InputAreaComponent;
