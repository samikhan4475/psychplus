import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { weekdays } from './constants';
import { WeekdayButton } from './weekday-button';
import { WeekdayLabel } from './weekday-label';

const WeekdaysSelect = () => {
  const [activeDays, setActiveDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setActiveDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  return (
    <>
      <Flex gap="2" justify="start" align="center" className="my-4">
        {weekdays.map((day) => (
          <WeekdayButton
            key={day}
            day={day}
            isActive={activeDays.includes(day)}
            onToggle={() => toggleDay(day)}
          />
        ))}
      </Flex>
      <Flex justify="start" align="center" className="mb-2 font-medium">
        <WeekdayLabel activeDays={activeDays} />
      </Flex>
    </>
  );
};

export { WeekdaysSelect };

