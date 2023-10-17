/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useUser } from "@auth0/nextjs-auth0/client";
import { isPointWithinRadius } from "geolib";
import React, { useEffect, useState } from "react";
import AnchorLink from "~/components/AnchorLink";
import PageLink from "~/components/PageLink";
import { api } from "~/utils/api";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const { user, isLoading } = useUser();

  const [location, setLocation] = useState<Coordinates | null>(null);
  const UFMG_COORDINATES: Coordinates = {
    latitude: -19.8719,
    longitude: -43.9662,
  };
  const UFMG_RADIUS = 1500; // 3 km
  const createAttendance = api.example.createAttendance.useMutation();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const isLocatedInsideUFMG = (): boolean => {
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

  return (
    <>
      {/* @ts-ignore */}
      <AnchorLink
        href="/api/auth/login"
        className="btn btn-primary btn-margin"
        tabIndex={0}
        testId="navbar-login-desktop"
      >
        Log in
      </AnchorLink>

      {user && (
        <>
          {/* @ts-ignore */}
          <img
            src={user.picture ?? ""}
            alt="Profile"
            className="nav-user-profile rounded-circle"
            width="50"
            height="50"
            data-testid="navbar-picture-desktop"
          />
          {/* @ts-ignore */}
          <PageLink href="/profile" icon="user" testId="navbar-profile-desktop">
            Profile
          </PageLink>
          {/* @ts-ignore */}
          <AnchorLink
            href="/api/auth/logout"
            icon="power-off"
            testId="navbar-logout-desktop"
          >
            Log out
          </AnchorLink>
        </>
      )}

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">My Location App</h1>
          {location ? (
            <div>
              <p className="mb-2">
                Current Location: {location.latitude}, {location.longitude}
              </p>
              <p className="text-lg font-semibold">
                {isLocatedInsideUFMG()
                  ? "You are located inside UFMG!"
                  : "You are not located inside UFMG."}
              </p>
            </div>
          ) : (
            <p>Getting your current location...</p>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          createAttendance.mutate();
        }}
      >
        Click me
      </button>
    </>
  );
};

export default Home;
