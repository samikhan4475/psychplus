'use client';

import { Flex } from '@radix-ui/themes';
import { INTERVAL } from '../types';
import { MonthButtons } from './month-buttons';
import { useStartDateInfo } from './use-start-date-info';
import { YearButtons } from './year-buttons';

interface IntervalButtonGroupProps {
  intervalType: INTERVAL.MONTH | INTERVAL.YEAR;
}

const IntervalButtonGroup = ({ intervalType }: IntervalButtonGroupProps) => {
  const [dayOfMonth, weekday, monthName] = useStartDateInfo();

  return (
    <Flex gap="2" className="my-3">
      {intervalType === INTERVAL.MONTH && (
        <MonthButtons dayOfMonth={dayOfMonth} weekday={weekday} />
      )}
      {intervalType === INTERVAL.YEAR && (
        <YearButtons dayOfMonth={dayOfMonth} weekday={weekday} monthName={monthName} />
      )}
    </Flex>
  );
};

export { IntervalButtonGroup };

