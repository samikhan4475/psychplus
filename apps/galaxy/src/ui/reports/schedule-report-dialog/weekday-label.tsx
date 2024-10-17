import { Text } from '@radix-ui/themes';
import { weekdays } from './constants';

interface DaysLabelProps {
  activeDays: string[];
}

const WeekdayLabel = ({ activeDays }: DaysLabelProps) => {

  const renderLabel = () => {
    if (activeDays.length === weekdays.length) {
      return 'Occurs everyday until';
    } else if (activeDays.length === 0) {
      return 'No days selected';
    } else {
      return `Occurs on: ${activeDays.join(', ')}`;
    }
  };

  return (
    <Text size="1">
      {renderLabel()}
    </Text>
  );
};

export { WeekdayLabel };
