/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { Container } from "~/components/Container";
import { type Coordinates } from "../attendance.constants";
import { getCurrentLocation } from "../attendance.utils";

import { CardAttendance } from "./CardAttendance";
import { CardLocation } from "./CardLocation";

export const AttendanceContainer: React.FC = () => {
  const location = useSignal<Coordinates | null>(null);

  // const isOnUFMG = isLocatedInsideUFMG(location.value);
  const isOnUFMG = true;

  useEffect(() => {
    getCurrentLocation(location);
  }, []);

  return (
    <Container className="flex justify-around ">
      <CardAttendance isOnUFMG={isOnUFMG} />
      <CardLocation isOnUFMG={isOnUFMG} location={location.value} />
    </Container>
  );
};
