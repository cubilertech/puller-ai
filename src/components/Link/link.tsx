import { CSSProperties, FC, LegacyRef, ReactNode } from "react";
import Link from "next/link";
import { CustomLinkVariants } from "@/utils/types";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: CustomLinkVariants;
  style?: CSSProperties;
  color?: string;
  target?: string;
  ref?: LegacyRef<HTMLAnchorElement> | undefined | null;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  variant = "simple",
  style,
  color = "#54A6FF",
  target,
  ref,
  ...props
}) => {
  switch (variant) {
    case "simple":
      return (
        <Link
          target={target}
          href={href}
          {...props}
          style={{ ...style, color }}
          ref={ref}
        >
          {children}
        </Link>
      );
    case "border":
      return (
        <Link
          target={target}
          href={href}
          {...props}
          ref={ref}
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
