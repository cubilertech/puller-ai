import { Paper as MuiPaper } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine-sc";
import { FC, ReactNode } from "react";

interface PaperProps {
  type: "light-border" | "dark-border" | "light-bg-border";
  children?: ReactNode;
  sx?: CSSProperties;
}

const Paper: FC<PaperProps> = ({ type, children, sx, ...props }) => {
  switch (type) {
    case "light-border":
      return (
        <>
          <MuiPaper
            {...props}
            sx={{
              borderRadius: "16px",
              border: "2px solid rgba(196, 196, 196, 0.60)",
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
            {...props}
            sx={{
              m: 1,
              borderRadius: "16px",
              border: "2px solid var(--Vision-pro-02, #393939)",
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
  }
};

export default Paper;
