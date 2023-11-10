import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect } from "react";
import { Container } from "~/components/Container";
import useCreateUser from "~/hooks/userRepo/useCreateUser";
import { updateUser } from "~/signals/user";

const NavBar = () => {
  const { user, isLoading } = useUser();
  const { createUser, getByExternalId } = useCreateUser();
  // Only run the query if user is defined and not loading
  const sub = user?.sub ?? "";
  // const { data, refetch } = getByExternalId(sub, { enabled: false });

  useEffect(() => {
    if (isLoading || !user?.sub) return;

    getByExternalId(user.sub)
      .then((data) => {
        const doesUserExist = !isLoading && data && user;

        if (data) updateUser(data);

        if (!doesUserExist && user) {
          console.log("create user");
          const image = user?.picture ?? "";
          const name = user?.name ?? "";
          const email = user?.email ?? "";
          const sub = user?.sub ?? "";

          createUser.mutate({
            image,
            name,
            email,
            sub,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading, user]);

  return (
    <div>
      {!user && (
        <Link href="/api/auth/login" className="btn btn-primary btn-margin">
          Log in
        </Link>
      )}
      {user && (
        <Container className="flex gap-4">
          <Link href="/profile">Profile</Link>

          <Link href="/api/auth/logout">Log out</Link>
        </Container>
      )}
    </div>
  );
};

export default NavBar;
