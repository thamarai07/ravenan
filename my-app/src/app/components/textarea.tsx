import React, { useState, ChangeEvent, FocusEvent } from "react";
import { TextareaProps } from "../types/types";
import Lable from "./label";


const Textarea: React.FC<TextareaProps> = ({
  value,
  placeholder = "Type something...",
  required = false,
  className,
  onChange,
  lablename,
  name
 
}) => {
  return (
    <>
    <Lable name={lablename} class="" />
    <textarea
      value={value}
      placeholder={placeholder}
      required={required}
      className={`border p-2 rounded resize-none focus:ring-2 focus:ring-blue-500 ${className}`}
      onChange={onChange}
      name={name}
    />
    </>
  );
};


export default Textarea;
