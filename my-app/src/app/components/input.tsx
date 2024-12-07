import { InputInterface } from "../types/types";
import Lable from "./label";
export default function Input({ type, name, value, onChange, onBlur, placeholder, lablename } : InputInterface) {
  return (
    <>
      <div className="mt-4">
        <Lable name={lablename} class="" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" // Add your styling here
        />
        
      </div>
    </>
  );
}
