import { type Attendance } from "@prisma/client";
import { z } from "zod";

type AttendanceWithArrived = {
  userId: Attendance["userId"];
  arrived: Attendance["arrived"];
  left?: never; // This ensures 'left' cannot be used here.
};

type AttendanceWithLeft = {
  userId: Attendance["userId"];
  left: Attendance["left"];
  arrived?: never; // This ensures 'arrived' cannot be used here.
};

export type CreateAttendance = AttendanceWithArrived | AttendanceWithLeft;
export type AttendanceType = Pick<Attendance, "arrived" | "left">;
export type AttendanceKeys = keyof AttendanceType;

export const AttendanceSchema = z.object({
  id: z.string(),
  arrived: z.coerce.date().nullable().optional(),
  left: z.coerce.date().nullable().optional(),
  time_spent: z.number().nullable(),
  createdAt: z.date(),
  userId: z.string(),
});

export const CheckAttendanceInput = AttendanceSchema.omit({
  id: true,
  time_spent: true,
  createdAt: true,
});
