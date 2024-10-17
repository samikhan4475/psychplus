import { IntervalButton } from './interval-button';

interface YearButtonsProps {
  dayOfMonth: number | null;
  weekday: string | null;
  monthName: string | null;
}

const YearButtons = ({ dayOfMonth, weekday, monthName }: YearButtonsProps) => {
  return (
    <>
      <IntervalButton
        label={`On ${monthName ?? ''} ${dayOfMonth ?? ''}`}
        option={`On ${monthName ?? ''} ${dayOfMonth ?? ''}`}
      />
      <IntervalButton
        label={`On the first ${weekday ?? ''} of ${monthName ?? ''}`}
        option={`On the first ${weekday ?? ''} of ${monthName ?? ''}`}
      />
    </>
  );
};

export { YearButtons };
