import { ICONS_TYPES, icons } from "@/utils/constants";
import { IconTypes } from "@/utils/types";
import Image from "next/image";
import { FC } from "react";

export interface IconProps {
  icon: IconTypes;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const Icon: FC<IconProps> = ({
  icon,
  width = 18,
  height = 18,
  disabled,
  ...props
}) => {
  const iconPath = icons[icon];

  if (!iconPath) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }

  if (icon === ICONS_TYPES.PLUS) {
    return disabled ? (
      <Image
        {...props}
        src={"/Images/Icons/disabled-plus-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    ) : (
      <Image
        {...props}
        src={"/Images/Icons/plus-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    );
  }

  if (icon === ICONS_TYPES.MINUS) {
    return disabled ? (
      <Image
        {...props}
        src={"/Images/Icons/disabled-minus-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    ) : (
      <Image
        {...props}
        src={"/Images/Icons/minus-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    );
  }
  if (icon === ICONS_TYPES.PAGINATIONLEFT) {
    return disabled ? (
      <Image
        {...props}
        src={"/Images/Icons/disabled-arrow-left-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    ) : (
      <Image
        {...props}
        src={"/Images/Icons/arrow-left-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    );
  }

  if (icon === ICONS_TYPES.PAGINATIONRIGHT) {
    return disabled ? (
      <Image
        {...props}
        src={"/Images/Icons/disabled-arrow-right-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    ) : (
      <Image
        {...props}
        src={"/Images/Icons/arrow-right-icon.svg"}
        alt="icon"
        width={width}
        height={height}
      />
    );
  }

  return (
    <Image {...props} src={iconPath} alt="icon" width={width} height={height} />
  );
};

export default Icon;
