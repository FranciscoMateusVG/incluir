import { Container } from "~/components/Container";
import { AttendanceContainer } from "~/containers/attendance/attendanceContainer";
import { AvatarContainer } from "~/containers/attendance/avatarContainer";

const Home: React.FC = () => {
  return (
    <Container className=" row flex min-h-screen flex-col justify-around  bg-gray-50 px-10">
      <AvatarContainer />
      <AttendanceContainer />
    </Container>
  );
};

export default Home;
