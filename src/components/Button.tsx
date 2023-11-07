import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  model?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    model = "primary",
    disabled,
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

  return (
    <button
      disabled={disabled}
      className={`h-10  w-full rounded-md  active:translate-y-0 ${className}   ${
        disabled ? "bg-gray-400 text-white" : modelType[model]
      }  ${animation}`}
      {...restOfProps}
    >
      {children}
    </button>
  );
};
