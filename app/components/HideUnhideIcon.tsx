"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
interface HideUnhideIconProps {
  onClick: () => void;
}
const HideUnhideIcon = (props: HideUnhideIconProps) => {
  var [hide, setHide] = useState(true);
  return (
    <div
      onClick={(e) => {
        props.onClick();
        setHide(!hide);
      }}
      className="cursor-pointer">
      {hide ? <Visibility /> : <VisibilityOff />}
    </div>
  );
};

export default HideUnhideIcon;
