import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
