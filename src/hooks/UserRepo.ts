import { $Enums, type User } from "@prisma/client";
import { useCallback } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

type CreateUser = Pick<User, "email" | "name" | "sub" | "image">;

function useUserRepo() {
  const createUser = api.user.createUser.useMutation();

  const save = useCallback(
    (user: CreateUser) => {
      if (!user.email) {
        throw new Error("Email is required");
      }
      if (!user.name) {
        throw new Error("Name is required");
      }
      if (!user.sub) {
        throw new Error("Sub is required");
      }

      createUser.mutate(user);
    },
    [createUser],
  );

  // Instead of fetching data here, return the useQuery functions
  const getById = api.user.getUserID.useQuery;
  const getByExternalId = api.user.getUserExternalId.useQuery;

  return {
    save,
    getById,
    getByExternalId,
  };
}

export default useUserRepo;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  sub: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
  role: z.nativeEnum($Enums.Role),
  isAdmin: z.boolean(),
});
