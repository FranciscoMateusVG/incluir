/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { Container } from "~/components/Container";
import useAttendanceRepo from "~/hooks/attendanceRepo/attendanceRepo";
import { USER_SIGNAL } from "~/signals/user";
import { type Coordinates } from "../attendance.constants";
import { getCurrentLocation, isLocatedInsideUFMG } from "../attendance.utils";

import { CardAttendance } from "./CardAttendance";
import { CardLocation } from "./CardLocation";

export const AttendanceContainer: React.FC = () => {
  const hasArrivedToday = useSignal(false);
  const hasLeftToday = useSignal(false);
  const location = useSignal<Coordinates | null>(null);

  const { getTodaysAttendance } = useAttendanceRepo();
  const isOnUFMG = isLocatedInsideUFMG(location.value);

  useEffect(() => {
    getCurrentLocation(location);
  }, []);

  useEffect(() => {
    void (async () => {
      if (!USER_SIGNAL.value.id) return;
      const attendance = await getTodaysAttendance(USER_SIGNAL.value.id);
      hasArrivedToday.value = attendance.some((a) => a.arrived);
      hasLeftToday.value = attendance.some((a) => a.left);
    })();
  }, [USER_SIGNAL.value.id]);

  return (
    <Container className="flex justify-around ">
      <CardAttendance isOnUFMG={isOnUFMG} />
      <CardLocation isOnUFMG={isOnUFMG} location={location.value} />
    </Container>
  );
};
