import { z } from 'zod'

type TherapySchemaType = z.infer<typeof TherapySchema>

const TherapySessionParticipantsEnum = z.enum(
  [
    'Patients',
    'PatientwithPatient/Guardian',
    'Patient&Partner',
    'Patient&Family',
    'Patient&Other',
  ],
  { required_error: 'Session Participants is required' },
)

type TherapySessionParticipantsEnumType = z.infer<
  typeof TherapySessionParticipantsEnum
>

const TherapySchema = z.object({
  therapyTimeSpent: z.string().min(1, { message: 'Time Spent is required' }),
  timeRangeOne: z
    .string()
    .refine((val) => val === '' || (Number(val) >= 16 && Number(val) <= 37), {
      message: 'Value must be between 16 and 37',
    })
    .optional(),
  timeRangeTwo: z
    .string()
    .refine((val) => val === '' || (Number(val) >= 38 && Number(val) <= 52), {
      message: 'Value must be between 38 and 52',
    })
    .optional(),
  timeRangeThree: z
    .string()
    .refine((val) => val === '' || (Number(val) >= 53 && Number(val) <= 99), {
      message: 'Value must be between 53 and 99',
    })
    .optional(),
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
  additionalTherapyDetail: z
    .string()
    .min(1, { message: 'Additional Therapy Detail is required' }),
})

export {
  TherapySchema,
  type TherapySchemaType,
  TherapySessionParticipantsEnum,
  type TherapySessionParticipantsEnumType,
}
