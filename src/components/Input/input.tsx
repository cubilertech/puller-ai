import { Input as MuiInput, InputAdornment } from "@mui/material";
import { Icon } from "../Icon";
import { FC } from "react";
import { IconTypes } from "@/utils/types";
import "./Input.css";

interface SearchbarProps {
  width?: number;
  height?: number;
  icon?: IconTypes;
  onChange?: (event: any) => void;
  placeholder?: string;
  value?: any;
}

const Input: FC<SearchbarProps> = ({
  width = 220,
  height = 40,
  icon,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div className="input-container">
      <MuiInput
        placeholder={placeholder}
        disableUnderline
        sx={{
          background: "rgb(115,130,133)",
          zIndex: 2,
          border: 0,
          padding: "10px 16px 10px 16px",
          height: height,
          width: width,
          borderRadius: "8px",
        }}
        value={value}
        onChange={onChange}
        startAdornment={
          icon && (
            <InputAdornment position="start">
              <Icon icon={icon} />{" "}
            </InputAdornment>
          )
        }
      />
    </div>
  );
};

export default Input;
