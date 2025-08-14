import { z } from 'zod'

export const noShowFormSchema = z.object({
  patientContactedTwiceQ1: z.enum(['yes', 'no']),
  patientRespondedQ2: z.enum(['yes', 'no']).optional(),
  safetyConcernQ3: z.enum(['yes', 'no']).optional(),
  welfareCheckDoneQ4: z.enum(['yes', 'no']).optional(),
  patientResponseQ5: z.enum(['yes', 'no']).optional(),
  patientEducatedQ6: z.enum(['yes', 'no']).optional(),
  comments: z.string().optional(),
})

export type NoShowFormSchema = z.infer<typeof noShowFormSchema>