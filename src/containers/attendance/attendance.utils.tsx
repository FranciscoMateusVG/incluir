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
      { latitude: location.latitude, longitude: location.longitude },
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

export const hasTimePassed = (
  timeString: string,
  type: "hour" | "minute" = "hour",
) => {
  // Parse the time string and create a date object for today with this time
  const [hours, minutes] = timeString.split(":").map(Number);
  const timeDate = new Date();
  if (!hours || !minutes) throw new Error("Invalid time string");
  timeDate.setHours(hours, minutes, 0, 0);

  // Get the current time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - timeDate.getTime();

  // Convert milliseconds to hours and check if an hour has passed
  const timeDiff = {
    hour: diffMs / 1000 / 60 / 60,
    minute: diffMs / 1000 / 60,
  };

  return timeDiff[type] >= 1;
};
