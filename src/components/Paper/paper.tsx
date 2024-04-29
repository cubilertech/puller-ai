import { PaperVariants } from "@/utils/types";
import { Paper as MuiPaper, SxProps } from "@mui/material";
import { FC, ReactNode } from "react";

interface PaperProps {
  variant: PaperVariants;
  children?: ReactNode;
  sx?: SxProps;
  onClick?: () => void;
}

const Paper: FC<PaperProps> = ({
  variant,
  children,
  sx,
  onClick,
  ...props
}) => {
  switch (variant) {
    case "light-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgb(93,97,108)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.15) -3.54%, rgba(114, 114, 114, 0.17) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "dark-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              m: 1,
              borderRadius: "16px",
              border:
                "2px solid linear-gradient(142.96deg, rgba(57, 57, 57, 0.6) -3.54%, rgba(97, 97, 97, 0.6) 99.99%)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.11) -3.54%, rgba(114, 114, 114, 0.13) 95.15%)",

              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "light-bg-border":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgba(196, 196, 196, 0.60)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "light-border-2":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgb(110,105,122)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
    case "dark-border-2":
      return (
        <>
          <MuiPaper
            onClick={onClick}
            {...props}
            sx={{
              borderRadius: "16px",
              border: "20px solid rgba(97, 97, 97, 0.6)",
              background:
                "linear-gradient(143deg, rgba(255, 255, 255, 0.07) -3.54%, rgba(114, 114, 114, 0.08) 95.15%)",
              backdropFilter: "blur(20px)",
              ...sx,
            }}
          >
            {children}
          </MuiPaper>
        </>
      );
  }
};

export default Paper;
