import { cn } from '@/utils';
import { Button } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { ScheduleTemplateSchemaType } from './schedule-report-form';

interface IntervalButtonProps {
  label: string;
  option: string;
}

const IntervalButton = ({ label, option }: IntervalButtonProps) => {
  const { setValue, watch } = useFormContext<ScheduleTemplateSchemaType>();
  const selectedOption = watch('intervalOption');

  const handleButtonClick = () => {
    setValue('intervalOption', option);
  };

  return (
    <Button
      size="1"
      variant='outline'
      color='gray'
      type='button'
      className={cn(
        'px-3 py-1 rounded-full cursor-pointer border bg-white border-pp-focus-border text-black',
        { 'bg-pp-focus-bg text-black border-pp-focus-border': selectedOption === option }
      )}
      onClick={handleButtonClick}
    >
      {label}
    </Button>
  );
};

export { IntervalButton };

