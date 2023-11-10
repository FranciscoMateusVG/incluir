/* eslint-disable @typescript-eslint/no-unsafe-return */
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

type CreateAttendance = AttendanceWithArrived | AttendanceWithLeft;
export type AttendanceType = Pick<Attendance, "arrived" | "left">;
export type AttendanceKeys = keyof AttendanceType;

function useAttendanceRepo() {
  // Queries
  // const query = useQuery("teste", () =>
  //   axios.get("/api/teste").then((res) => res.data),
  // );

  const saveAttendance = (attendance: CreateAttendance) => {
    if (!attendance.userId) {
      throw new Error("User Id is required");
    }

    // createAttendance.mutate(attendance);
  };

  // Instead of fetching data here, return the useQuery functions

  return {
    saveAttendance,
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
