import { type AttendanceKeys } from "~/hooks/attendanceRepo";
import { USER_SIGNAL } from "~/signals/user";

export const createAttendanceObject = (attendance: AttendanceKeys) => {
  const dateAndTimeNow = new Date();
  const userId = USER_SIGNAL.value.id;
  const userLeft = attendance === "left";
  const userArriverd = attendance === "arrived";
  if (userLeft) return { userId: userId, left: dateAndTimeNow };

  if (userArriverd) return { userId: userId, arrived: dateAndTimeNow };

  throw new Error("Invalid attendance key");
};
