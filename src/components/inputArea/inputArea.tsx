import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { FC } from "react";
import { CustomInput } from "@/modules/PannelArea/input";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { Tooltip } from "../Tooltip";
import { Divider } from "../Divider";

interface InputAreaComponentPorps {
  handleValidate: () => void;
  onChangeInput: (event: any) => any;
  handleSource: () => void;
  handlePrompt: () => void;
  isLoading: boolean;
  value: string;
}

const InputAreaComponent: FC<InputAreaComponentPorps> = ({
  handleValidate,
  onChangeInput,
  handleSource,
  handlePrompt,
  isLoading,
  value,
}) => {
  return (
    <Paper variant="light-border" sx={{ border: "none" }}>
      <Box
        sx={{
          p: "12px",
        }}
      >
        <Box
          sx={{
            marginBottom: "0.8rem",
          }}
        >
          {/* <Paper
            variant="dark-border"
            sx={{
              backdropFilter: "none",
              padding: "0.5rem",
              m: 0,
              minHeight: "8rem",
              display: "flex",
              maxHeight: "15rem",
              borderRadius: "8px",
            }}
          > */}
          <span
            style={{
              display: "contents",
              width: "100%",
              minHeight: "8rem",
              overflow: "auto",
            }}
          >
            <CustomInput
              disabled={isLoading}
              value={value}
              onChange={(event) => onChangeInput(event)}
            />
          </span>
          <Divider
            variant="fullWidth"
            type="light"
            sx={{ borderColor: "#969696" }}
          />
          {/* </Paper> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* {!value?.length || isLoading ? (
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
                  onClick={() => handlePrompt()}
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
                  onClick={() => handleSource()}
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
          ) : ( */}
          <Tooltip
            variant="info"
            title={
              CURRENT_MODE === MODES.PILOT
                ? "This Feature is not available in Private Beta"
                : ""
            }
          >
            <Box width={163}>
              <Button
                size="medium"
                variant="outlined"
                label="Manage Sources"
                disabled={CURRENT_MODE === MODES.PILOT ? true : isLoading}
                fullWidth
                endIcon={
                  <Icon
                    icon="minus"
                    height={2}
                    width={8}
                    disabled={CURRENT_MODE === MODES.PILOT ? true : isLoading}
                  />
                }
              />
            </Box>
          </Tooltip>
          {/* )} */}

          {isLoading ? (
            ""
          ) : (
            <Box>
              <Box width={155}>
                <Button
                  onClick={() => handleValidate()}
                  fullWidth
                  size="medium"
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
