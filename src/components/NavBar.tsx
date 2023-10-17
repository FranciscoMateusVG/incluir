/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

import AnchorLink from "./AnchorLink";
import PageLink from "./PageLink";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              <NavItem>
                {/* @ts-ignore */}
                <PageLink href="/" className="nav-link" testId="navbar-home">
                  Home
                </PageLink>
              </NavItem>
              {user && (
                <>
                  <NavItem>
                    {/* @ts-ignore */}
                    <PageLink
                      href="/csr"
                      className="nav-link"
                      testId="navbar-csr"
                    >
                      Client-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    {/* @ts-ignore */}
                    <PageLink
                      href="/ssr"
                      className="nav-link"
                      testId="navbar-ssr"
                    >
                      Server-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    {/* @ts-ignore */}
                    <PageLink
                      href="/external"
                      className="nav-link"
                      testId="navbar-external"
                    >
                      External API
                    </PageLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!isLoading && !user && (
                <NavItem id="qsLoginBtn">
                  {/* @ts-ignore */}
                  <AnchorLink
                    href="/api/auth/login"
                    className="btn btn-primary btn-margin"
                    tabIndex={0}
                    testId="navbar-login-desktop"
                  >
                    Log in
                  </AnchorLink>
                </NavItem>
              )}
              {user && (
                <UncontrolledDropdown
                  nav
                  inNavbar
                  data-testid="navbar-menu-desktop"
                >
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture ?? ""}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                      height="50"
                      data-testid="navbar-picture-desktop"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header data-testid="navbar-user-desktop">
                      {user.name}
                    </DropdownItem>
                    <DropdownItem className="dropdown-profile" tag="span">
                      {/* @ts-ignore */}
                      <PageLink
                        href="/profile"
                        icon="user"
                        testId="navbar-profile-desktop"
                      >
                        Profile
                      </PageLink>
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn">
                      {/* @ts-ignore */}
                      <AnchorLink
                        href="/api/auth/logout"
                        icon="power-off"
                        testId="navbar-logout-desktop"
                      >
                        Log out
                      </AnchorLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isLoading && !user && (
              <Nav className="d-md-none" navbar>
                {/* @ts-ignore */}
                <AnchorLink
                  href="/api/auth/login"
                  className="btn btn-primary btn-block"
                  tabIndex={0}
                  testId="navbar-login-mobile"
                >
                  Log in
                </AnchorLink>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
