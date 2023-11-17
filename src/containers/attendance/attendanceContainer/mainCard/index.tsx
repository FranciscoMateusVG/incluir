/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { Card } from "~/components/Card";
import useAttendanceRepo from "~/hooks/attendanceRepo/attendanceRepo";
import { type AttendanceKeys } from "~/hooks/attendanceRepo/attendanceRepo.types";
import { USER_SIGNAL } from "~/signals/user";
import {
  createAttendanceObject,
  getTimeFromDate,
} from "../../attendance.utils";
import { EstouAquiButton } from "./estouAquiButton";
import { SaiDaquiButton } from "./saiDaquiButton";

interface CardAttendanceProps {
  isOnUFMG: boolean;
}

export const MainCard: React.FC<CardAttendanceProps> = ({ isOnUFMG }) => {
  const { saveAttendance, getTodaysAttendance } = useAttendanceRepo();
  const hasArrivedToday = useSignal<null | string>(null);
  const hasLeftToday = useSignal<null | string>(null);
  const isLoading = useSignal(true);

  useEffect(() => {
    void (async () => {
      if (!USER_SIGNAL.value.id) return;
      const attendance = await getTodaysAttendance(USER_SIGNAL.value.id);
      const arrivedDate = attendance.find((a) => a.arrived)?.arrived;
      const leftDate = attendance.find((a) => a.left)?.left;
      hasArrivedToday.value = arrivedDate ? getTimeFromDate(arrivedDate) : null;
      hasLeftToday.value = leftDate ? getTimeFromDate(leftDate) : null;
      isLoading.value = false;
    })();
  }, [USER_SIGNAL.value.id]);

  const handleSaveAttendance = async (attendance: AttendanceKeys) => {
    try {
      isLoading.value = true;
      if (attendance === "arrived")
        hasArrivedToday.value = getTimeFromDate(new Date());
      if (attendance === "left")
        hasLeftToday.value = getTimeFromDate(new Date());
      await saveAttendance(
        createAttendanceObject(attendance),
        USER_SIGNAL.value.id,
      );
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = () => {
    // If he is not on UFMG
    if (!isOnUFMG) return true;

    // If he has already arrived and left for the day
    if (hasArrivedToday.value && hasLeftToday.value) return true;

    return false;
  };

  return (
    <Card
      model="sea"
      className="flex min-w-[45%] flex-col items-center justify-center gap-10 py-10"
    >
      <EstouAquiButton
        handleSaveAttendance={handleSaveAttendance}
        hasArrivedToday={hasArrivedToday.value}
        isDisabled={isDisabled()}
        isLoading={isLoading.value}
      />

      <SaiDaquiButton
        handleSaveAttendance={handleSaveAttendance}
        hasArrivedToday={hasArrivedToday.value}
        hasLeftToday={hasLeftToday.value}
        isDisabled={isDisabled()}
        isLoading={isLoading.value}
      />
    </Card>
  );
};
