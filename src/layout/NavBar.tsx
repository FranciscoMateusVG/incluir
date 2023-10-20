import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useUserRepo from "~/hooks/UserRepo";

const NavBar = () => {
  const { user, isLoading } = useUser();
  const { save, getByExternalId } = useUserRepo();
  // Only run the query if user is defined and not loading
  const sub = user?.sub ?? "";
  const { data, refetch } = getByExternalId(sub, { enabled: false });

  useEffect(() => {
    async function fetch() {
      if (!isLoading && user) {
        await refetch();
      }
    }

    void fetch();
  }, [user]);

  useEffect(() => {
    const doesUserExist = !isLoading && data && user;

    if (!doesUserExist && user) {
      const image = user?.picture ?? "";
      const name = user?.name ?? "";
      const email = user?.email ?? "";
      const sub = user?.sub ?? "";

      save({
        image,
        name,
        email,
        sub,
      });
    }
  }, [data]);

  return (
    <div>
      <Link href="/api/auth/login" className="btn btn-primary btn-margin">
        Log in
      </Link>

      {user && (
        <>
          <Image
            src={user.picture ?? ""}
            alt="Profile"
            className="nav-user-profile rounded-circle"
            width="50"
            height="50"
            data-testid="navbar-picture-desktop"
          />

          <Link href="/profile">Profile</Link>

          <Link href="/api/auth/logout">Log out</Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
