import { cn } from '@/utils';
import { Button } from '@radix-ui/themes';

interface WeekdayButtonProps {
  day: string;
  isActive: boolean;
  onToggle: () => void;
}

const WeekdayButton = ({ day, isActive, onToggle }: WeekdayButtonProps) => {
  return (
    <Button
      size="1"
      variant='outline'
      color='gray'
      type='button'
      className={cn(
        'px-3 py-1 rounded-full cursor-pointer border border-1 bg-white text-black',
        { 'bg-pp-focus-bg text-black border-pp-focus-border': isActive }
      )}
      onClick={onToggle}
    >
      {day}
    </Button>
  );
};

export { WeekdayButton };

