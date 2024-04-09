import { MuiToolTip } from "@/theme/overrides/tooltip";
import { Box, Tooltip as MuiTooltip, Typography } from "@mui/material";
import { FC, ReactElement, ReactNode } from "react";

interface TooltipProps {
  title?: string;
  description?: string;
  children: ReactElement;
}

const Tooltip: FC<TooltipProps> = ({
  title,
  description,
  children,
  ...props
}) => {
  return (
    <div>
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
    </div>
  );
};

export default Tooltip;
