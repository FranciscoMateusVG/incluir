import { Card } from "~/components/Card";
import { Container } from "~/components/Container";
import { SubTitle } from "~/components/SubTitle";
import { type Coordinates } from "../../attendance.constants";

interface CardLocationProps {
  location: Coordinates | null;
  isOnUFMG: boolean;
}

export const CardLocation: React.FC<CardLocationProps> = ({
  location,
  isOnUFMG,
}) => {
  return (
    <Card model="sea" className="min-w-[45%]">
      {location ? (
        <Container className="relative flex h-full flex-col justify-center">
          <SubTitle className="top-0 md:absolute">
            Current Location: {location.latitude}, {location.longitude}
          </SubTitle>

          {isOnUFMG ? (
            <SubTitle className="text-green-400 ">
              Você está na UFMG! Por favor marque sua presença.
            </SubTitle>
          ) : (
            <SubTitle className="text-red-400 ">
              Você não está na UFMG! Não é permitido a presença.
            </SubTitle>
          )}
        </Container>
      ) : (
        <p>Getting your current location...</p>
      )}
    </Card>
  );
};
