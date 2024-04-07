import { icons } from "@/utils/constants";
import { IconTypes } from "@/utils/types";
import Image from "next/image";
import { FC } from "react";

export interface IconProps {
  icon: IconTypes;
  width?: number;
  height?: number;
}

const Icon: FC<IconProps> = ({ icon, width = 18, height = 18, ...props }) => {
  const iconPath = icons[icon];

  if (!iconPath) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <Image
      {...props}
      src={iconPath}
      alt="icon"
      width={width}
      height={height}
    />
  );
};

export default Icon;
