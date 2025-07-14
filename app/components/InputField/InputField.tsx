"use client";
import React, { DetailedHTMLProps, ReactElement, useEffect, useRef, useState } from "react";
import "./InputField.css";
import useOutsideClick from "../custom-hooks";
import { ArrowDropDown } from "@mui/icons-material";
interface InputFieldProps {
  onDataChange?: (data: string) => void;
  icon?: ReactElement;
}
interface InputFieldInputProps extends InputFieldProps, DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}
interface InputData {
  hasFocus: boolean;
  data?: string | null;
}
const InputField = (props: InputFieldInputProps) => {
  const [state, setState] = useState<InputData>({ hasFocus: false });
  const { onDataChange, icon, ...newProps } = props;
  return (
    <div className={props.className}>
      <label
        className={`flex flex-col bg-background p-2 border rounded-xl w-full
         ${state.hasFocus ? "border-accent text-accent" : "border-transparent"} transition duration-150
         `.trim()}
        htmlFor={props.id}>
        {props.title}
        <div className="flex flex-row">
          <input
            {...newProps}
            placeholder={props.title}
            onBlur={() => {
              setState({
                ...state,
                hasFocus: false,
              });
            }}
            onChange={(e) => {
              if (props.onDataChange) props.onDataChange(e.target.value.toString());
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
          {props.icon && (state.data?.trim().length ?? 0) > 0 ? props.icon : null}
        </div>
      </label>
    </div>
  );
};
interface DropdownProps {
  items: Array<string>;
  onItemSelect: (data: string) => void;
}
interface DropdownInputProps extends DropdownProps, React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}
export const InputDropdown = (props: DropdownInputProps) => {
  const [state, setState] = useState<InputData>({ hasFocus: false, data: "" });
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () =>
      setState({
        ...state,
        hasFocus: false,
      }),
  });

  return (
    <div className={props.className}>
      <div
        onClick={() => {
          if (props.disabled) return;
          setState((value) => (value = { ...value, hasFocus: !value.hasFocus }));
        }}
        ref={dropdownRef}
        className={`relative flex flex-col bg-background p-2 border rounded-xl
       ${state.hasFocus ? "border-accent text-accent" : "border-transparent"} transition duration-150`}>
        <div>{props.title}</div>
        <div className="flex flex-row">
          <div className={`h-6 w-full flex self-stretch ${state.data == "" ? "text-gray-400" : ""}`} ref={props.ref}>
            {state.data == "" ? props.value?.toString() ?? props.title : state.data}
          </div>
          <ArrowDropDown />
        </div>
        <div className={`absolute top-full z-50 left-0 mt-1 w-full ${state.hasFocus ? "" : "hidden"} bg-background text-foreground`}>
          {props.items.map((x) => {
            return (
              <div
                key={x}
                className="p-2 hover:bg-accent hover:text-black"
                onClick={(_) => {
                  props.onItemSelect(x);
                  setState((value) => (value = { ...value, data: x }));
                }}>
                {x}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default InputField;
