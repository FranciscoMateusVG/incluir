import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  size: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ className, size }) => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <Image
        src={user.picture ?? ""}
        alt="Profile"
        className="nav-user-profile rounded-full"
        width={size}
        height={size}
        data-testid="navbar-picture-desktop"
      />
    </div>
  );
};
