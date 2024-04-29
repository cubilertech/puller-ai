import { CSSProperties, FC, ReactNode } from "react";
import Link from "next/link";
import { CustomLinkVariants } from "@/utils/types";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: CustomLinkVariants;
  style?: CSSProperties;
  color?: string;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  variant = "simple",
  style,
  color = "#54A6FF",
  ...props
}) => {
  switch (variant) {
    case "simple":
      return (
        <Link href={href} {...props} style={{ ...style, color }}>
          {children}
        </Link>
      );
    case "border":
      return (
        <Link
          href={href}
          {...props}
          style={{
            ...style,
            color: "#54A6FF",
            borderBottom: "1px solid #54A6FF",
            lineHeight: "10px",
          }}
        >
          {children}
        </Link>
      );
  }
};

export default CustomLink;
