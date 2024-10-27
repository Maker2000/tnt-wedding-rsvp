"use client";
import React, { ReactElement, useState } from "react";
import "./InputField.css";
interface InputFieldProps {
  type: string;
  name: string;
  title: string;
  onChange?: (data: string) => void;
  icon?: ReactElement;
}
interface InputData {
  hasFocus: boolean;
  data: string;
}
const InputField = (props: InputFieldProps) => {
  var [state, setState] = useState<InputData>({ hasFocus: false, data: "" });
  return (
    <div>
      <label
        className={`flex flex-col bg-panel p-2 border rounded-xl
         ${state.hasFocus ? "border-accent text-accent" : "border-transparent"} transition duration-150
         `}
        htmlFor={props.name}>
        {props.title}
        <div className="flex flex-row">
          <input
            type={props.type}
            id={props.name}
            onBlur={() => {
              setState({
                ...state,
                hasFocus: false,
              });
            }}
            onChange={(e) => {
              if (props.onChange) props.onChange(e.target.value.toString());
              setState({
                ...state,
                data: e.target.value.toString(),
              });
            }}
            onFocus={() => {
              setState({
                ...state,
                hasFocus: true,
              });
            }}
            className="bg-transparent text-foreground border-none flex-grow"
          />
          {props.icon && state.data.trim().length > 0 ? props.icon : null}
        </div>
      </label>
    </div>
  );
};

export default InputField;
