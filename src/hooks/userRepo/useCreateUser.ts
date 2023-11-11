import { type User } from "@prisma/client";
import axios from "axios";
import { useMutation } from "react-query";
import { type CreateUser } from "./createUser.types";

function useCreateUser() {
  const createUser = useMutation((input: CreateUser) =>
    axios.post("/api/user/create", input),
  );

  const getByExternalId = (id: string) =>
    axios
      .get("/api/user/get-by-external-id", { params: { id } })
      .then((res: { data: User }) => res.data);

  return {
    createUser,
    getByExternalId,
  };
}

export default useCreateUser;
