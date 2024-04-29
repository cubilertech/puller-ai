import { Box, Tooltip as MuiTooltip, Typography } from "@mui/material";
import { FC, ReactElement } from "react";
import { Icon } from "../Icon";
import { TooltipVariants } from "@/utils/types";

interface TooltipProps {
  variant: TooltipVariants;
  title?: string;
  description?: string;
  children: ReactElement;
}

const Tooltip: FC<TooltipProps> = ({
  title,
  description,
  children,
  variant,
  ...props
}) => {
  switch (variant) {
    case "info":
      return (
        <MuiTooltip
          placement="top"
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="text-md-regular"
                color={"rgba(230, 230, 230, 1)"}
              >
                {title}
              </Typography>
              <Typography variant="text-sm">{description}</Typography>
            </Box>
          }
          {...props}
        >
          {children}
        </MuiTooltip>
      );
    case "status":
      return (
        <MuiTooltip
          placement="bottom-start"
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {" "}
              <Typography
                variant="text-md-semibold"
                display={"flex"}
                gap={"1rem"}
              >
                <Icon icon="live" /> Live
              </Typography>
              <Typography
                variant="text-md-semibold"
                display={"flex"}
                gap={"1rem"}
              >
                <Icon icon="issues" /> Issues
              </Typography>
              <Typography
                variant="text-md-semibold"
                display={"flex"}
                gap={"1rem"}
              >
                <Icon icon="blocked" /> Blocked
              </Typography>
              <Typography
                variant="text-md-semibold"
                display={"flex"}
                gap={"1rem"}
              >
                <Icon icon="needPermissions" /> Need Permissions
              </Typography>
              <Typography variant="text-sm">{description}</Typography>
            </Box>
          }
          {...props}
        >
          {children}
        </MuiTooltip>
      );
  }
};

export default Tooltip;
