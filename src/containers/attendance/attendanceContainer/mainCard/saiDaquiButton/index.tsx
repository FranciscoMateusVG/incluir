import { Button } from "~/components/Button";
import { hasTimePassed } from "~/containers/attendance/attendance.utils";

interface SaiDaquiButtonProps {
  isDisabled: boolean;
  hasArrivedToday: string | null;
  hasLeftToday: string | null;
  isLoading: boolean;
  handleSaveAttendance: (attendance: "arrived" | "left") => void;
}

export const SaiDaquiButton: React.FC<SaiDaquiButtonProps> = ({
  isDisabled,
  hasArrivedToday,
  hasLeftToday,
  isLoading,
  handleSaveAttendance,
}) => {
  if (!hasArrivedToday) return null;

  if (hasLeftToday && !isLoading) {
    return <div>Voce ja marcou sua saída hoje as {hasLeftToday} !</div>;
  }

  const OneHourHaveNOTPassed = !hasTimePassed(hasArrivedToday, "hour");

  if (OneHourHaveNOTPassed) {
    return (
      <div>
        Em breve poderá marcar sua saída ! Aguarde uma hora após sua chegada.
      </div>
    );
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={() => handleSaveAttendance("left")}
      model="secondary"
      className="max-w-[50%]"
      loading={isLoading}
    >
      Saí Daqui!
    </Button>
  );
};
