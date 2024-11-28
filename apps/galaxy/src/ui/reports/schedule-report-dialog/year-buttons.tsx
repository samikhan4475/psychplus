import { IntervalButton } from './interval-button';

interface YearButtonsProps {
  dayOfMonth: number | null;
  weekday: string | null;
  monthName: string | null;
}

const monthNameToNumber = (monthName: string | null): number | null => {
  const months: { [key: string]: number } = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };
  return monthName ? months[monthName] ?? null : null;
};

const YearButtons = ({ dayOfMonth, weekday, monthName }: YearButtonsProps) => {
  const monthNumber = monthNameToNumber(monthName);

  return (
    <IntervalButton
      label={`On every ${dayOfMonth ?? ''} of ${monthName ?? ''}`}
      option={`${dayOfMonth ?? ''} ${monthNumber ?? ''}`}
    />
  );
};

export { YearButtons };
