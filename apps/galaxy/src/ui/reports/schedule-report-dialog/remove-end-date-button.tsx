'use client';

import { Button } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { ScheduleTemplateSchemaType } from './schedule-report-form';

const RemoveEndDateButton = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>();
  const endDate = form.watch('endDate');

  const handleClearEndDate = () => {
    form.resetField('endDate');
  };

  if (!endDate) return null;

  return (
    <Button
      size="1"
      variant='ghost'
      className="text-pp-blue cursor-pointer w-[100px] ml-1"
      onClick={handleClearEndDate}
    >
      Remove End Date
    </Button>
  );
};

export { RemoveEndDateButton };

