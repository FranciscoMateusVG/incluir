/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { type IconType } from "react-icons/lib";

interface SubTitleProps {
  children: React.ReactNode;
  className?: string;
  Icon?: IconType;
}

export const SubTitle: React.FC<SubTitleProps> = ({
  children,
  className,
  Icon,
}) => {
  return (
    <div className={`flex flex-row gap-2 text-xl font-bold ${className}`}>
      <div className="pt-[2px]">
        {/* @ts-ignore */}
        {Icon && <Icon />}
      </div>
      {children}
    </div>
  );
};
