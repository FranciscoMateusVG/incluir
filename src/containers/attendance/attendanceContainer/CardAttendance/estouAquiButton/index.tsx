import { Button } from "~/components/Button";

interface EstouAquiButtonProps {
  isDisabled: boolean;
  hasArrivedToday: string | null;
  isLoading: boolean;
  handleSaveAttendance: (attendance: "arrived" | "left") => void;
}

export const EstouAquiButton: React.FC<EstouAquiButtonProps> = ({
  isDisabled,
  hasArrivedToday,
  isLoading,
  handleSaveAttendance,
}) => {
  if (hasArrivedToday && !isLoading) {
    return (
      <div>
        Voce ja marcou sua presença hoje as {hasArrivedToday}, em breve poderá
        marcar sua saída !
      </div>
    );
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={() => handleSaveAttendance("arrived")}
      className="max-w-[50%]"
      loading={isLoading}
    >
      Estou Aqui!
    </Button>
  );
};
