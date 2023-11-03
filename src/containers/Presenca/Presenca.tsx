import React, { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import { Title } from "~/components/Title";
import { Card } from "../../components/Card";
import { type Coordinates } from "./Presenca.constants";
import { getCurrentLocation, isLocatedInsideUFMG } from "./Presenca.utils";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    getCurrentLocation(setLocation);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card>
        <Title>My Location App</Title>
        <Card>
          <Button>Estou Aqui!</Button>
        </Card>
        <Card model="sea">
          <Button model="secondary">Sai Daqui!</Button>
        </Card>
        <Card model="red">
          <Button model="disabled">To desabilitado</Button>
        </Card>
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
      </Card>
    </div>
  );
};

export default Home;
