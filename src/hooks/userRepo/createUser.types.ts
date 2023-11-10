import { $Enums, type User } from "@prisma/client";
import { z } from "zod";

export type CreateUser = Pick<User, "email" | "name" | "sub" | "image">;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  sub: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
  role: z.nativeEnum($Enums.Role),
  isAdmin: z.boolean(),
});

export const CheckUserInput = UserSchema.omit({
  id: true,
  role: true,
  isAdmin: true,
});
