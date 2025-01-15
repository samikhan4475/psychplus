import { z } from 'zod'

const TherapySessionParticipantsEnum = z.enum(
  ['PatientsOnly', 'PatientwithPatient/Guardian', 'Patient&Other'],
  { required_error: 'required' },
)

type TherapySessionParticipantsEnumType = z.infer<
  typeof TherapySessionParticipantsEnum
>

const TherapySchema = z
  .object({
    therapyTimeSpent: z.string().min(1, { message: 'Time Spent is required' }),
    timeRangeOne: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 16 && Number(val) <= 37), {
        message: 'Value must be between 16 and 37',
      }),
    timeRangeTwo: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 38 && Number(val) <= 52), {
        message: 'Value must be between 38 and 52',
      }),
    timeRangeThree: z
      .string()
      .optional()
      .refine((val) => !val || (Number(val) >= 53 && Number(val) <= 99), {
        message: 'Value must be between 53 and 99',
      }),
    therapySessionParticipants: TherapySessionParticipantsEnum,
    patientOther: z.string().optional(),
    therapyDetailsModality: z
      .array(
        z.object({
          value: z.string().min(1, { message: 'Value is required' }),
          display: z.string().min(1, { message: 'Display is required' }),
        }),
      )
      .min(1, { message: 'Therapy Modality is required' }),
    therapyDetailsInterventions: z
      .array(
        z.object({
          value: z.string().min(1, { message: 'Value is required' }),
          display: z.string().min(1, { message: 'Display is required' }),
        }),
      )
      .min(1, { message: 'Interventions is required' }),
    additionalTherapyDetail: z.string().min(1, { message: 'required' }),
  })
  .superRefine((data, ctx) => {
    if (data.therapyTimeSpent === 'timeRangeOne' && !data.timeRangeOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeOne'],
        message: 'Required',
      })
    }
    if (data.therapyTimeSpent === 'timeRangeTwo' && !data.timeRangeTwo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeTwo'],
        message: 'Required',
      })
    }
    if (data.therapyTimeSpent === 'timeRangeThree' && !data.timeRangeThree) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['timeRangeThree'],
        message: 'Required',
      })
    }
  })

type TherapySchemaType = z.infer<typeof TherapySchema>

export {
  TherapySchema,
  type TherapySchemaType,
  TherapySessionParticipantsEnum,
  type TherapySessionParticipantsEnumType,
}
