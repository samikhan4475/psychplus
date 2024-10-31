import { z } from 'zod'

type TherapySchemaType = z.infer<typeof TherapySchema>

const TherapySchema = z.object({
  therapyTimeSpent: z.enum(['16-37 mins', '38-52 mins', '53-99 mins']), 
  therapySessionParticipants: z.enum(['Patients', 'Patient with Patient/Guardian', 'Patient & Partner','Patient & Family','Patient & Other'], ),
  patientOther: z.string().optional(),
  therapyDetailsModality: z.array(
    z.object({
      value: z.string(),
      display: z.string(),
    })
  ),
  therapyDetailsInterventions: z.array(
    z.object({
      value: z.string(),
      display: z.string(),
    })
  ),
  additionalTherapyDetail:z.string()
})

export { TherapySchema, type TherapySchemaType }
