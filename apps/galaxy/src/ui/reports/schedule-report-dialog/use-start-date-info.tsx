import { format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ScheduleTemplateSchemaType } from './schedule-report-form';

const useStartDateInfo = () => {
  const { watch } = useFormContext<ScheduleTemplateSchemaType>();
  const startDate = watch('beginOn');
  const [dayOfMonth, setDayOfMonth] = useState<number | null>(null);
  const [weekday, setWeekday] = useState<string | null>(null);
  const [monthName, setMonthName] = useState<string | null>(null);

  useEffect(() => {
    if (startDate && startDate.year && startDate.month && startDate.day) {
      const date = new Date(startDate.year, startDate.month - 1, startDate.day);

      if (isValid(date)) {
        setDayOfMonth(date.getDate());
        setWeekday(format(date, 'EEEE'));
        setMonthName(format(date, 'MMMM'));
      } else {
        setDayOfMonth(null);
        setWeekday(null);
        setMonthName(null);
      }
    }
  }, [startDate]);

  return [dayOfMonth, weekday, monthName] as const;
};

export { useStartDateInfo };

