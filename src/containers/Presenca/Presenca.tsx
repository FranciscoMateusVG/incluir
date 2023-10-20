import React, { useEffect, useState } from "react";
import { type Coordinates } from "./Presenca.constants";
import { getCurrentLocation, isLocatedInsideUFMG } from "./Presenca.utils";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    getCurrentLocation(setLocation);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">My Location App</h1>
        {location ? (
          <div>
            <p className="mb-2">
              Current Location: {location.latitude}, {location.longitude}
            </p>
            <p className="text-lg font-semibold">
              {isLocatedInsideUFMG(location)
                ? "You are located inside UFMG!"
                : "You are not located inside UFMG."}
            </p>
          </div>
        ) : (
          <p>Getting your current location...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
