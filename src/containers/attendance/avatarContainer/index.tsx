import React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Avatar } from "~/components/Avatar";
import { Container } from "~/components/Container";
import { SubTitle } from "~/components/SubTitle";
import { Title } from "~/components/Title";
import { USER_SIGNAL } from "~/signals/user";

export const AvatarContainer: React.FC = () => {
  return (
    <Container className="flex gap-10">
      <Avatar className="" size={150} />
      <div>
        <Title className="mb-2">{USER_SIGNAL.value.name}</Title>
        <SubTitle Icon={BsFillCalendarDateFill}>
          Última vez que entrou foi em 15/10/2023
        </SubTitle>
      </div>
    </Container>
  );
};
