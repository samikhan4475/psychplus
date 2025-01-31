import { z } from 'zod'

const TherapySchema = z
  .object({
    therapyTimeSpent: z
      .string()
      .min(1, { message: 'Therapy time must be entered' }),
    timeRangeOne: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 16 && Number(val) <= 37), {
        message:
          'Time spent must be specified and must be greater than 16 minutes for Therapy.',
      }),
    timeRangeTwo: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 38 && Number(val) <= 52), {
        message:
          'Time spent must be specified and must be greater than 38 minutes for Therapy.',
      }),
    timeRangeThree: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 53 && Number(val) <= 99), {
        message:
          'Time spent must be specified and must be greater than 53 minutes for Therapy ',
      }),
    therapySessionParticipants: z
      .string()
      .min(1, { message: 'Session Participants must be selected' }),
    patientOther: z.string().optional(),
    therapyDetailsModality: z
      .array(
        z.object({
          value: z.string().min(1, { message: 'Value is required' }),
          display: z.string().min(1, { message: 'Display is required' }),
        }),
      )
      .min(1, { message: 'Modality must be selected.' }),
    therapyDetailsInterventions: z
      .array(
        z.object({
          value: z.string().min(1, { message: 'Value is required' }),
          display: z.string().min(1, { message: 'Display is required' }),
        }),
      )
      .min(1, { message: 'Interventions must be selected.' }),
    additionalTherapyDetail: z.string().min(1, {
      message:
        'Additional details for Therapy must be provided.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.therapyTimeSpent === 'timeRangeOne' && !data.timeRangeOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeOne'],
        message:
          'Time spent must be specified and must be greater than 16 minutes for Therapy.',
      })
    }
    if (data.therapyTimeSpent === 'timeRangeTwo' && !data.timeRangeTwo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeTwo'],
        message:
          'Time spent must be specified and must be greater than 38 minutes for Therapy.',
      })
    }
    if (data.therapyTimeSpent === 'timeRangeThree' && !data.timeRangeThree) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeThree'],
        message:
          'Time spent must be specified and must be greater than 53 minutes for Therapy.',
      })
    }
  })

type TherapySchemaType = z.infer<typeof TherapySchema>

export { TherapySchema, type TherapySchemaType }
