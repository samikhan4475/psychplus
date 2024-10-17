import { FormContainer } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateValue } from 'react-aria-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { REPEAT_INTERVAL } from '../types';
import { DistributionGroupsSelect } from './distribution-groups';
import { ScheduleReportButton } from './schedule-report-button';
import { ScheduleReportIntervals } from './schedule-report-intervals';
import ScheduleReportSwitch from './schedule-report-switch';

const schema = z.object({
  startDate: z.custom<DateValue>(),
  endDate: z.custom<DateValue>(),
  repeatCount: z.string().optional(),
  repeatInterval: z.string().optional(),
  intervalOption: z.string().optional(),
  isSchedule: z.boolean().optional(),
});

type ScheduleTemplateSchemaType = z.infer<typeof schema>;

const ScheduleReportForm = () => {
  const form = useForm<ScheduleTemplateSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      repeatCount: REPEAT_INTERVAL.NOREPEAT,
      repeatInterval: '',
      intervalOption: '',
      isSchedule: false,
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ScheduleTemplateSchemaType> = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <ScheduleReportIntervals />
      <DistributionGroupsSelect />
      <ScheduleReportSwitch />
      <ScheduleReportButton />
    </FormContainer>
  );
};

export { ScheduleReportForm, type ScheduleTemplateSchemaType };

