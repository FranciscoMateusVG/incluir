/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSignal } from "@preact/signals-react";
import { useEffect } from "react";
import { Container } from "~/components/Container";
import { type Coordinates } from "../attendance.constants";
import { getCurrentLocation } from "../attendance.utils";

import { CardAttendance } from "./cardAttendance";
import { CardLocation } from "./cardLocation";

export const AttendanceContainer: React.FC = () => {
  const location = useSignal<Coordinates | null>(null);

  const isOnUFMG = true; //isLocatedInsideUFMG(location.value);

  useEffect(() => {
    getCurrentLocation(location);
  }, []);

  return (
    <Container className="flex flex-col justify-around gap-24 md:flex-row  ">
      <CardAttendance isOnUFMG={isOnUFMG} />
      <CardLocation isOnUFMG={isOnUFMG} location={location.value} />
    </Container>
  );
};
