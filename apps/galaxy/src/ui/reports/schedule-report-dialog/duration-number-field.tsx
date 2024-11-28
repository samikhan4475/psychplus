import { FormFieldContainer, FormFieldError, NumberInput } from '@/components';
import { useFormContext } from 'react-hook-form';
import { ScheduleTemplateSchemaType } from './schedule-report-form';
import { useEffect, useRef } from 'react';

const NumberOfDuration = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>();
  const durationInterval = form.watch('durationInterval');
  const forDuration = form.watch('forDuration');
  const previousValues = useRef<{ forDuration?: string; durationInterval?: string }>({
    forDuration: undefined,
    durationInterval: undefined,
  });

  const getMaxValue = (interval: string) => {
    switch (interval) {
      case 'week':
        return 4;
      case 'day':
        return 30;
      case 'month':
        return 12;
      case 'year':
        return 10;
      default:
        return 31;
    }
  };

  const maxValue = durationInterval ? getMaxValue(durationInterval) : 31;

  const limitHandler = (values: { floatValue?: number; value: string }) => {
    const { floatValue, value } = values;
    if (value === '') {
      return true;
    }
    return floatValue !== undefined && floatValue >= 1 && floatValue <= maxValue;
  };
  useEffect(() => {
    if (
      forDuration !== previousValues.current.forDuration ||
      durationInterval !== previousValues.current.durationInterval
    ) {
      form.setValue('numberOfDuration', '');
      previousValues.current = { forDuration, durationInterval };
    }
  }, [forDuration, durationInterval, form]);

  return (
    <FormFieldContainer className="max-w-[52px]">
      <NumberInput
        field="numberOfDuration"
        className="h-[24px]"
        max={maxValue}
        isAllowed={limitHandler}
        disabled={forDuration !== "last"}
      />
      <FormFieldError name="numberOfDuration" />
    </FormFieldContainer>
  );
};

export { NumberOfDuration };

