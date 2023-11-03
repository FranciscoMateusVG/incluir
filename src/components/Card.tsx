import React from "react";

interface CardProps {
  children: React.ReactNode;
  model?: "white" | "sea" | "red";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  model = "white",
  className,
}) => {
  const modelType = {
    white: "bg-white",
    sea: "bg-gray-200 ",
    red: "bg-red-400",
  };

  return (
    <div
      className={`rounded-md  p-2 shadow-md ${modelType[model]} ${className}`}
    >
      {children}
    </div>
  );
};
