"use client";
import {
  Box,
  MenuItem,
  Skeleton,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Button } from "../Button";
import { palette } from "@/theme/Palette";
import CustomLink from "../Link/link";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ButtonVariants, CustomButtonVariants, Model } from "@/utils/types";
import { Tooltip } from "../Tooltip";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { useAppSelector } from "@/libs/redux/hooks";
import { getSubmitValidateLoading } from "@/libs/redux/features/globalLoadings";

interface ButtonProps {
  variant: CustomButtonVariants | ButtonVariants;
  label: string;
  onClick?: () => void;
  href?: string;
  width?: number;
  sx?: SxProps;
}

interface PageHeaderProps {
  title: string;
  selectedModel?: string;
  buttons?: ButtonProps[];
  models?: Model[];
  handleChangeModal?: (val: string) => void;
}

function isCustomVariant(variant: any): variant is CustomButtonVariants {
  return (
    variant === "select" ||
    variant === "rounded-SQL" ||
    variant === "smallbutton" ||
    variant === "round" ||
    variant === "request-history"
  );
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  buttons,
  selectedModel,
  models,
  handleChangeModal,
}) => {
  const submitValidateLoading = useAppSelector(getSubmitValidateLoading);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{display: "flex", gap: 2, alignItems:"center"}}>
          <Typography
            variant="display-xs-medium"
            color="white"
            display={"flex"}
            alignItems={"center"}
            gap={1}
          >
            {title === "Retrievers" ? (
              <>
                {title}{" "}
                <Tooltip variant="status">
                  <InfoOutlinedIcon
                    sx={{
                      color: palette.color.gray[150],
                      ":hover": {
                        color: palette.base.white,
                      },
                    }}
                  />
                </Tooltip>
              </>
            ) : title === "Create a Request" ? (
              " "
            ) : (
              title
            )}
          </Typography>
          {CURRENT_MODE === MODES.PILOT && title === "Validate Request" && (
            <>
              {submitValidateLoading ? (
                <Skeleton style={{ width: "100px", margin: "0", height: 32 }} />
              ) : (
                <TextField
                  select={true}
                  label="Modal"
                  value={selectedModel}
                  size="small"
                  variant="outlined"
                  sx={{width: "200px"}}
                  onChange={(event) => {
                    if (handleChangeModal)
                      handleChangeModal(event.target.value);
                  }}
                >
                  {models?.map((model, index) => (
                    <MenuItem key={index} value={model.id}>
                      {model.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </>
          )}
        </Box>
        <Box display={"flex"} gap={"0.5rem"}>
          {buttons?.map((button, index) =>
            button.href ? (
              <CustomLink href={button.href} key={index}>
                {isCustomVariant(button.variant) ? (
                  <CustomButton
                    key={index}
                    text={button.label}
                    variant={button.variant}
                    onClick={button?.onClick}
                    sx={{ ...button.sx }}
                  />
                ) : (
                  <Box width={button.width || 240}>
                    <Button
                      key={index}
                      label={button.label}
                      variant={button.variant}
                      onClick={button?.onClick}
                      fullWidth
                      sx={{ ...button.sx }}
                    />
                  </Box>
                )}
              </CustomLink>
            ) : isCustomVariant(button.variant) ? (
              <CustomButton
                key={index}
                text={button.label}
                variant={button.variant}
                onClick={button?.onClick}
                sx={{ ...button.sx }}
              />
            ) : (
              <Box width={button.width || 240}>
                <Button
                  key={index}
                  label={button.label}
                  variant={button.variant}
                  onClick={button?.onClick}
                  fullWidth
                  sx={{ ...button.sx }}
                />
              </Box>
            )
          )}
        </Box>
      </Box>
    </>
  );
};
export default PageHeader;
