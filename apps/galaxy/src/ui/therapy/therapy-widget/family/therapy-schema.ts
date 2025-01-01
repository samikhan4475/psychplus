import { z } from 'zod'

type FamilyTherapySchemaType = z.infer<typeof FamilyTherapySchema>

const TherapySessionParticipantsEnum = z.enum(
  ['FamilyWithOutPatientPresent', 'FamilyWithPatientPresent'],
  { required_error: 'Session Participants is required' },
)

type TherapySessionParticipantsEnumType = z.infer<
  typeof TherapySessionParticipantsEnum
>

const FamilyTherapySchema = z.object({
  therapyTimeSpent: z.string().min(1, { message: 'Time Spent is required' }),
  timeRangeOne: z
    .string()
    .min(1, { message: 'Time Range is required' })
    .refine((val) => val === '' || (Number(val) >= 26 && Number(val) <= 99), {
      message: 'Value must be between 26 and 99',
    }),
  therapySessionParticipants: TherapySessionParticipantsEnum,
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
  FamilyTherapySchema,
  type FamilyTherapySchemaType,
  TherapySessionParticipantsEnum,
  type TherapySessionParticipantsEnumType,
}
