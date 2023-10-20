import { z } from "zod";
import { UserSchema } from "~/hooks/UserRepo";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const CreateUserInput = UserSchema.omit({
  id: true,
  role: true,
  isAdmin: true,
});

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getUserID: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: input },
    });
  }),

  getUserExternalId: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { sub: input },
      });
    }),

  createUser: publicProcedure
    .input(CreateUserInput)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: { ...input },
      });
    }),
});
