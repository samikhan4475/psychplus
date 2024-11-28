import { Flex, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { weekdays } from './constants';
import { ScheduleTemplateSchemaType } from './schedule-report-form';
import { WeekdayButton } from './weekday-button';

const WeekdaysSelect = () => {
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const form = useFormContext<ScheduleTemplateSchemaType>();

  useEffect(() => {
    form.setValue('scheduleDays', activeDays);
  }, [activeDays, form]);

  const toggleDay = (day: string) => {
    setActiveDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  return (
    <Flex gap="2" justify="start" align="center" className="my-4">
      <Text size="1" weight="medium">on</Text>
      {weekdays.map((day) => (
        <WeekdayButton
          key={day}
          day={day}
          isActive={activeDays.includes(day)}
          onToggle={() => toggleDay(day)}
        />
      ))}
    </Flex>
  );
};

export { WeekdaysSelect };

