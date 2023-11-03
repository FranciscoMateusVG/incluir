import React from "react";

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
  return <div className={`text-xl font-bold ${className}`}>{children}</div>;
};
