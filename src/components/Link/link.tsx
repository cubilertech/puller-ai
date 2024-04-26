import { FC, ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: "border" | "simple";
  color?: string;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  variant = "simple",
  color = "#54A6FF",
  ...props
}) => {
  switch (variant) {
    case "simple":
      return (
        <Link href={href} {...props} style={{ color: color }}>
          {children}
        </Link>
      );
    case "border":
      return (
        <Link
          href={href}
          {...props}
          style={{
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
