import { type Attendance } from "@prisma/client";
import { useCallback } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

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

type CreateAttendance = AttendanceWithArrived | AttendanceWithLeft;
export type AttendanceType = Pick<Attendance, "arrived" | "left">;
export type AttendanceKeys = keyof AttendanceType;

function useAttendanceRepo() {
  const createAttendance = api.attendance.createAttendance.useMutation();

  const save = useCallback(
    (attendance: CreateAttendance) => {
      if (!attendance.userId) {
        throw new Error("User Id is required");
      }

      createAttendance.mutate(attendance);
    },
    [createAttendance],
  );

  // Instead of fetching data here, return the useQuery functions
  const getAttendance = api.attendance.getAttendance.useQuery;

  return {
    save,
    getAttendance,
  };
}

export default useAttendanceRepo;

export const AttendanceSchema = z.object({
  id: z.string(),
  arrived: z.date().nullable().optional(),
  left: z.date().nullable().optional(),
  time_spent: z.number().nullable(),
  createdAt: z.date(),
  userId: z.string(),
});
