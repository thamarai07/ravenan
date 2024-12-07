import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
} from "react";

export interface InputInterface {
  type: string;
  name: string;
  placeholder: string;
  class: string | undefined;
  lablename: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: any;
}

export interface LabelInterface {
  name: string;
  class: string;
}

export interface ButtonInterface {
  variant: string;
  content: string;
  className: string;
  onClick?: () => void;
}
export interface AlertInterFace {
  content: string;
  link: ReactNode;
}

export interface TaskFormInterface {
  title: string;
  description: string;
  due_date: string;
  status: string;
  UserId: string;
}

export interface TaskDetailsFormInterface {
  title: string;
  description: string;
  due_date: string;
  status: string;
  UserId: {
    email: string;
    name: string;
    _id: string;
  };
}

export interface TextareaProps {
  value: string; 
  placeholder?: string;
  required?: boolean; 
  className?: string; 
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  lablename: string;
  name: string;
}

export interface StatusOption {
  _id: string;
  value: string;
  label: string;
  color: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface SelectOptionProps {
  options: StatusOption[]; // Array of status options
  value: string; // Selected value
  onChange: (value: string) => void; // Handler for change
}

export interface UserIfInterFace {
  UserId: string; 
}

export interface ContentPageMultiStatusTapInterface {
  count: number;
  label: string;
}
[];

export interface userDetailsInterface {
  _id: string;
  description: string;
  due_date: string;
  status: {
    _id: string;
    label: string;
  };
  title: string;
  UserId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
[];


