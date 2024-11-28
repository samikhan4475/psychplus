import { IntervalButton } from './interval-button';

interface MonthButtonsProps {
  dayOfMonth: number | null;
  weekday: string | null;
}

const MonthButtons = ({ dayOfMonth, weekday }: MonthButtonsProps) => {
  return (
    <IntervalButton
      label={`On day ${dayOfMonth ?? ''} of a month`}
      option={`${dayOfMonth ?? ''}`}
    />
  );
};

export { MonthButtons };
