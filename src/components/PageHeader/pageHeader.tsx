"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Button } from "../Button";
import { palette } from "@/theme/Palette";
import CustomLink from "../Link/link";
import CustomButton from "@/common/CustomButtons/CustomButtons";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ButtonVariants, CustomButtonVariants } from "@/utils/types";
import { Tooltip } from "../Tooltip";

interface ButtonProps {
  variant: CustomButtonVariants | ButtonVariants;
  label: string;
  onClick?: () => void;
  href?: string;
  width?: number;
}

interface PageHeaderProps {
  title: string;
  buttons?: ButtonProps[];
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

const PageHeader: FC<PageHeaderProps> = ({ title, buttons }) => {
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
          ) : (
            title
          )}
        </Typography>
        <Box display={"flex"} gap={"1rem"}>
          {buttons?.map((button, index) =>
            button.href ? (
              <CustomLink href={button.href} key={index}>
                {isCustomVariant(button.variant) ? (
                  <CustomButton
                    key={index}
                    text={button.label}
                    variant={button.variant}
                    onClick={button?.onClick}
                  />
                ) : (
                  <Box width={button.width || 240}>
                    <Button
                      key={index}
                      label={button.label}
                      variant={button.variant}
                      onClick={button?.onClick}
                      fullWidth
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
              />
            ) : (
              <Box width={button.width || 240}>
                <Button
                  key={index}
                  label={button.label}
                  variant={button.variant}
                  onClick={button?.onClick}
                  fullWidth
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
