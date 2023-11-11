import { type Signal } from "@preact/signals-react";
import { isPointWithinRadius } from "geolib";
import { type AttendanceKeys } from "~/hooks/attendanceRepo/attendanceRepo.types";
import { USER_SIGNAL } from "~/signals/user";
import {
  UFMG_COORDINATES,
  UFMG_RADIUS,
  type Coordinates,
} from "./attendance.constants";

export const isLocatedInsideUFMG = (location: Coordinates | null): boolean => {
  if (location) {
    const isWithinRadius = isPointWithinRadius(
      location,
      UFMG_COORDINATES,
      UFMG_RADIUS,
    );
    return isWithinRadius;
  }
  return false;
};

export const getCurrentLocation = (location: Signal<Coordinates | null>) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        location.value = position.coords;
      },
    );
  } else {
    throw "Geolocation is not supported by this browser.";
  }
};

export const createAttendanceObject = (attendance: AttendanceKeys) => {
  const dateAndTimeNow = new Date();
  const userId = USER_SIGNAL.value.id;
  const userLeft = attendance === "left";
  const userArriverd = attendance === "arrived";
  if (userLeft) return { userId: userId, left: dateAndTimeNow };

  if (userArriverd) return { userId: userId, arrived: dateAndTimeNow };

  throw new Error("Invalid attendance key");
};

export const convertToBrazilianDate = (date: Date) => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const getTimeFromDate = (date: Date | null | undefined) => {
  if (!date) throw new Error("Date is not defined");
  const dateConverted = new Date(date);
  return dateConverted.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
