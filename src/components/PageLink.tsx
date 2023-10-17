/* eslint-disable @typescript-eslint/ban-ts-comment */
import Link from "next/link";

import NavBarItem from "./NavBarItem";
//@ts-ignore
const PageLink = ({ children, href, className, icon, tabIndex, testId }) => {
  return (
    <Link legacyBehavior href={href}>
      <a>
        <NavBarItem
          href={href}
          className={className}
          icon={icon}
          tabIndex={tabIndex}
          testId={testId}
        >
          {children}
        </NavBarItem>
      </a>
    </Link>
  );
};

export default PageLink;
