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
  const beginOn = form.watch('beginOn');
  return (
    <Flex className="items-center gap-1">
      <FormFieldLabel className="!text-1">
        End Date
      </FormFieldLabel>
      <DatePickerInput field="terminateOn" minValue={beginOn} className='w-[120px]' />
      <RemoveEndDateButton />
    </Flex>
  );
};

export { EndDate };
