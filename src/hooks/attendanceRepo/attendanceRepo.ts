import { Attendance } from "@prisma/client";
import axios from "axios";
import { type CreateAttendance } from "./attendanceRepo.types";

function useAttendanceRepo() {
  const saveAttendance = async (
    attendance: CreateAttendance,
    userId: string,
  ) => {
    if (!attendance.userId) {
      throw new Error("User Id is required");
    }
    await axios.post(`/api/attendance/save-attendance/${userId}`, attendance);
  };

  const getTodaysAttendance = async (userId: string) => {
    const today = new Date();
    const { data } = await axios.get<Attendance[]>(
      `/api/attendance/get-todays-attendance/${userId}?date=${today.toISOString()}`,
    );

    return data;
  };

  return {
    saveAttendance,
    getTodaysAttendance,
  };
}

export default useAttendanceRepo;
