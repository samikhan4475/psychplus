import { DateValue } from '@internationalized/date'
import z from 'zod'

const schema = z
  .object({
    terminateOn: z.custom<DateValue>(),
    repeatCount: z.string().min(1, 'Required'),
    repeatInterval: z.string().optional(),
    forDuration: z.string().min(1, 'Required'),
    numberOfDuration: z.string().optional(),
    durationInterval: z.string().min(1, 'Required'),
    scheduleDays: z.array(z.string()).optional(),
    intervalOption: z.string().optional(),
    isSchedule: z.boolean().optional(),
    distributionGroups: z.array(z.string()).min(1, 'required'),
    isEnabled: z.boolean().optional(),
    monthSelection: z.array(z.string()),
    monthDateSelection: z.array(z.string()),
    weekdaysSelection: z.array(z.string()),
    hourSelection: z.array(z.string()),
    minuteSelection: z.array(z.string()),
    beginOn: z
      .custom<DateValue>()
      .refine((value) => value !== null && value !== undefined, {
        message: 'Required',
      }),
    parameters: z
      .array(
        z.object({
          id: z.string(),
          scheduleParameterValue: z
            .union([z.string(), z.array(z.string())])
            .optional(),
          reportTemplateId: z.string().optional(),
          parameterCode: z.string().optional(),
          templateParameterId: z.string().optional(),
          scheduleId: z.string().optional(),
        }),
      )
      .optional(),
  })
  .refine(
    (data) =>
      data.forDuration !== 'last' ||
      (data.numberOfDuration && data.numberOfDuration.trim() !== ''),
    {
      path: ['numberOfDuration'],
      message: 'Required',
    },
  )
  .refine(
    (data) =>
      data.repeatCount === 'notrepeat' ||
      (data.repeatInterval && data.repeatInterval.trim() !== ''),
    {
      path: ['repeatInterval'],
      message: 'Required',
    },
  )

type ScheduleTemplateSchemaType = z.infer<typeof schema>

export { schema, type ScheduleTemplateSchemaType }
