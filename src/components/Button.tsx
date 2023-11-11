/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  model?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    model = "primary",
    disabled,
    loading,
    ...restOfProps
  } = props;

  const modelType = {
    primary: "bg-red-600  hover:bg-red-700  cursor-pointer  text-white",
    secondary:
      "bg-white hover:bg-gray-200  cursor-pointer border-2 border-solid border-black",
  };

  const animation = disabled
    ? ""
    : "transform-gpu transition-transform hover:-translate-y-1 hover:shadow-lg";

  const isDisabledOrLoading = disabled || loading;

  return (
    <button
      disabled={isDisabledOrLoading}
      className={`h-10  w-full  rounded-md   active:translate-y-0 ${className}   ${
        isDisabledOrLoading ? "bg-gray-400 text-white" : modelType[model]
      }  ${animation}`}
      {...restOfProps}
    >
      {!loading && children}
      {loading && <Spinner className="h-7 w-7" />}
    </button>
  );
};
