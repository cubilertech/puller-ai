"use client";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { Button } from "../Button";
import { palette } from "@/theme/Palette";
import RoundedButton from "@/common/RoundedButton/roundedButton";
import CustomLink from "../Link/link";

interface PageHeaderProps {
  type: "Recent" | "Results" | "create" | "Validate" | "Preview";
}

const PageHeader: FC<PageHeaderProps> = ({ type }) => {
  switch (type) {
    case "Recent":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Recent Requests
          </Typography>
          <Box></Box>
        </Box>
      );
    case "Results":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Your Results
          </Typography>
          <Box></Box>
        </Box>
      );
    case "create":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Create a Request
          </Typography>
          <CustomLink href="/recent">
            <Box width={242}>
              <Button variant="outlined" fullWidth label="Request History" />
            </Box>
          </CustomLink>
        </Box>
      );
    case "Validate":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Validate Request
          </Typography>
          <Box pr={5}>
            <RoundedButton variant="button" />
          </Box>
        </Box>
      );
    case "Preview":
      return (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="display-xs-semibold" color={palette.base.white}>
            Preview Data
          </Typography>
          <Box></Box>
        </Box>
      );
  }
};

export default PageHeader;
