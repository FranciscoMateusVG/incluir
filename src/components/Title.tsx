import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <div className={`text-3xl font-bold ${className}`}>{children}</div>;
};
