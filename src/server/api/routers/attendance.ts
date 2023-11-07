import { AttendanceSchema } from "~/hooks/attendanceRepo";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const CreateAttendance = AttendanceSchema.omit({
  id: true,
  time_spent: true,
  createdAt: true,
});

const GetAttendance = AttendanceSchema.omit({
  id: true,
  time_spent: true,
  arrived: true,
  left: true,
});

export const attendanceRouter = createTRPCRouter({
  getAttendance: publicProcedure
    .input(GetAttendance)
    .query(async ({ input, ctx }) => {
      return ctx.prisma.attendance.findMany({
        where: { userId: input.userId, createdAt: input.createdAt },
      });
    }),

  createAttendance: publicProcedure
    .input(CreateAttendance)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.attendance.create({
        data: { ...input },
      });
    }),
});
