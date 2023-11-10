import { type User } from "@prisma/client";
import axios from "axios";
import { useMutation } from "react-query";
import { api } from "~/utils/api";
import { type CreateUser } from "./createUser.types";

function useCreateUser() {
  const createUser = useMutation((input: CreateUser) =>
    axios.post("/api/user/create", input),
  );

  // Instead of fetching data here, return the useQuery functions
  const getById = api.user.getUserID.useQuery;
  const getByExternalId = (id: string) =>
    axios
      .get("/api/user/get-by-external-id", { params: { id } })
      .then((res: { data: User }) => res.data);

  return {
    createUser,
    getById,
    getByExternalId,
  };
}

export default useCreateUser;
