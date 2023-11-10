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
      const now = input.createdAt;
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const attendances = await ctx.prisma.attendance.findMany();
      return attendances;
    }),

  createAttendance: publicProcedure
    .input(CreateAttendance)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.attendance.create({
        data: { ...input },
      });
    }),
});
