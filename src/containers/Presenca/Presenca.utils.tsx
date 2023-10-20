import { isPointWithinRadius } from "geolib";
import { type GeolibInputCoordinates } from "geolib/es/types";
import {
  Coordinates,
  UFMG_COORDINATES,
  UFMG_RADIUS,
} from "./Presenca.constants";

export const isLocatedInsideUFMG = (
  location: GeolibInputCoordinates,
): boolean => {
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

export const getCurrentLocation = (
  setLocation: React.Dispatch<React.SetStateAction<Coordinates | null>>,
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setLocation(position.coords);
      },
    );
  } else {
    throw "Geolocation is not supported by this browser.";
  }
};
