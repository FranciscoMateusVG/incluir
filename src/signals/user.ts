import { signal } from "@preact/signals-react";
import { type User } from "@prisma/client";

export const USER_SIGNAL = signal<User>({
  id: "",
  name: "",
  sub: "",
  email: "",
  image: "",
  role: "STUDENT",
  isAdmin: false,
});

export const updateUser = (state: Partial<User>) => {
  USER_SIGNAL.value = { ...USER_SIGNAL.value, ...state };
};
