import { FormFieldContainer } from '@/components';
import { useFormContext } from 'react-hook-form';
import { IntervalSelect } from './interval-select';
import { RepeatCountSelect } from './repeat-count-select';
import { ScheduleTemplateSchemaType } from './schedule-report-form';
import { REPEAT_INTERVAL } from '../types';

const RepeatSelect = () => {
  const { watch } = useFormContext<ScheduleTemplateSchemaType>();
  const repeatCount = watch('repeatCount');

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <RepeatCountSelect />
      {repeatCount !== REPEAT_INTERVAL.NOREPEAT && <IntervalSelect />}
    </FormFieldContainer>
  );
};

export { RepeatSelect };
