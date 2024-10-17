import { IntervalButton } from './interval-button';

interface MonthButtonsProps {
  dayOfMonth: number | null;
  weekday: string | null;
}

const MonthButtons = ({ dayOfMonth, weekday }: MonthButtonsProps) => {
  return (
    <>
      <IntervalButton
        label={`On day ${dayOfMonth ?? ''}`}
        option={`On day ${dayOfMonth ?? ''}`}
      />
      <IntervalButton
        label={`On the first ${weekday ?? ''}`}
        option={`On the first ${weekday ?? ''}`}
      />
    </>
  );
};

export { MonthButtons };
