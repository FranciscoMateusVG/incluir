/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Avatar } from "~/components/Avatar";
import { Container } from "~/components/Container";
import { Title } from "~/components/Title";

import { useSignal } from "@preact/signals-react";
import useAttendanceRepo from "~/hooks/attendanceRepo/attendanceRepo";
import { type AttendanceKeys } from "~/hooks/attendanceRepo/attendanceRepo.types";
import { USER_SIGNAL } from "~/signals/user";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { SubTitle } from "../../components/SubTitle";
import { type Coordinates } from "./Presenca.constants";
import { getCurrentLocation, isLocatedInsideUFMG } from "./Presenca.utils";

const Home: React.FC = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const hasArrivedToday = useSignal(false);
  const hasLeftToday = useSignal(false);
  useEffect(() => {
    getCurrentLocation(setLocation);
  }, []);

  const { saveAttendance, getTodaysAttendance } = useAttendanceRepo();
  const isOnUFMG = isLocatedInsideUFMG(location);

  useEffect(() => {
    void (async () => {
      if (!USER_SIGNAL.value.id) return;
      const attendance = await getTodaysAttendance(USER_SIGNAL.value.id);
      hasArrivedToday.value = attendance.some((a) => a.arrived);
      hasLeftToday.value = attendance.some((a) => a.left);
    })();
  }, [USER_SIGNAL.value.id]);

  const handleSaveAttendance = async (attendance: AttendanceKeys) => {
    const userId = USER_SIGNAL.value.id;
    const createAttendanceObject = (attendance: AttendanceKeys) => {
      const dateAndTimeNow = new Date();
      if (attendance === "left")
        return { userId: userId ?? "", left: dateAndTimeNow };

      if (attendance === "arrived")
        return { userId: userId ?? "", arrived: dateAndTimeNow };

      throw new Error("Invalid attendance key");
    };

    await saveAttendance(createAttendanceObject(attendance), userId);
  };

  return (
    <div className=" row flex min-h-screen flex-col justify-around  bg-gray-50 px-10">
      <button onClick={() => console.log(hasLeftToday.value)}>
        TESTE AQUI SEU MALANDRINHO
      </button>
      <Container className="flex gap-10">
        <Avatar className="" size={150} />
        <div>
          <Title className="mb-2">{USER_SIGNAL.value.name}</Title>
          <SubTitle Icon={BsFillCalendarDateFill}>
            Última vez que entrou foi em 15/10/2023
          </SubTitle>
        </div>
      </Container>
      <Container className="flex justify-around ">
        <Card
          model="sea"
          className="flex min-w-[45%] flex-col items-center justify-center gap-10 py-10"
        >
          <Button
            disabled={isOnUFMG}
            onClick={() => handleSaveAttendance("arrived")}
            className="max-w-[50%]"
          >
            Estou Aqui!
          </Button>
          <Button
            disabled={isOnUFMG}
            onClick={() => handleSaveAttendance("left")}
            model="secondary"
            className="max-w-[50%]"
          >
            Saí Daqui!
          </Button>
        </Card>
        <Card model="sea" className="min-w-[45%]">
          {location ? (
            <Container className="relative flex h-full flex-col justify-center">
              <SubTitle className="left- absolute top-0">
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
      </Container>
      <Container></Container>
    </div>
  );
};

export default Home;
