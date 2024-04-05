"use client";
import { icons } from "@/utils/constants";
import { IconTypes } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface IconProps {
  icon: IconTypes;
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({ icon, width, height, ...props }) => {
  const [currentIcon, setCurrentIcon] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (icons[icon]) {
      setCurrentIcon(icons[icon]);
    }
  }, [icon]);

  return currentIcon ? (
    <Image
      {...props}
      src={currentIcon}
      alt="icon"
      width={width ?? 18}
      height={height ?? 18}
    />
  ) : <></>;
};
export default Icon;
