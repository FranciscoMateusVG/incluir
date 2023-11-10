/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";
import useAttendanceRepo from "~/hooks/attendanceRepo/attendanceRepo";
import { type AttendanceKeys } from "~/hooks/attendanceRepo/attendanceRepo.types";
import { USER_SIGNAL } from "~/signals/user";
import { createAttendanceObject } from "../../attendance.utils";

interface CardAttendanceProps {
  isOnUFMG: boolean;
}

export const CardAttendance: React.FC<CardAttendanceProps> = ({ isOnUFMG }) => {
  const { saveAttendance } = useAttendanceRepo();

  const handleSaveAttendance = async (attendance: AttendanceKeys) => {
    await saveAttendance(
      createAttendanceObject(attendance),
      USER_SIGNAL.value.id,
    );
  };

  return (
    <Card
      model="sea"
      className="flex min-w-[45%] flex-col items-center justify-center gap-10 py-10"
    >
      <Button
        disabled={isOnUFMG}
        onClick={() => handleSaveAttendance("arrived")}
        className="max-w-[50%]"
      >
        Estou Aqui!
      </Button>
      <Button
        disabled={isOnUFMG}
        onClick={() => handleSaveAttendance("left")}
        model="secondary"
        className="max-w-[50%]"
      >
        Saí Daqui!
      </Button>
    </Card>
  );
};
