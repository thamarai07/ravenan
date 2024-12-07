import React, { FC } from "react";
import { SelectOptionProps } from "../types/types";

const SelectOption: FC<SelectOptionProps> = ({ onChange,options,value}) => {
  return (
    <>
      <label>Status</label>
      <select
        className="p-2 rounded border w-[100%]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Please Select</option>
        {options && options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ color: option.color }}
            
          >
             {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectOption;
