import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  model?: "primary" | "secondary" | "disabled";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  model = "primary",
  ...props
}) => {
  const modelType = {
    primary: "bg-red-600  hover:bg-red-700  text-white",
    secondary: "bg-white hover:bg-gray-200 border-2 border-solid border-black",
    disabled: "bg-gray-400 text-white",
  };

  const animation =
    model !== "disabled"
      ? "transform-gpu transition-transform hover:-translate-y-1 hover:shadow-lg"
      : "";

  return (
    <button
      disabled={model === "disabled"}
      className={`h-10  w-full cursor-pointer rounded-md  active:translate-y-0   ${modelType[model]}  ${animation}`}
      {...props}
    >
      {children}
    </button>
  );
};
