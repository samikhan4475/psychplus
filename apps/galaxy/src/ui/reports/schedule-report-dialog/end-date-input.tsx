'use client';

import {
  DatePickerInput,
  FormFieldLabel
} from '@/components';
import { Flex } from '@radix-ui/themes';
import { useFormContext } from 'react-hook-form';
import { RemoveEndDateButton } from './remove-end-date-button';
import { ScheduleTemplateSchemaType } from './schedule-report-form';

const EndDate = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>();
  const startDate = form.watch('startDate');
  return (
    <Flex className="items-center gap-1">
      <FormFieldLabel className="!text-1" required>
        End Date
      </FormFieldLabel>
      <DatePickerInput field="endDate" minValue={startDate} className='w-[120px]' />
      <RemoveEndDateButton />
    </Flex>
  );
};

export { EndDate };
