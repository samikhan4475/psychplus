import { z } from 'zod'

type AimsSchemaType = {
  [key: string]: string
}

const aimsSchema = z.object({
  FacialAndOralMovementsQ1: z.string().nullable(),
  FacialAndOralMovementsQ2: z.string().nullable(),
  FacialAndOralMovementsQ3: z.string().nullable(),
  FacialAndOralMovementsQ4: z.string().nullable(),
  ExtremityMovementsQ5: z.string().nullable(),
  ExtremityMovementsQ6: z.string().nullable(),
  TrunkMovementsQ7: z.string().nullable(),
  GlobalJudgmentsQ8: z.string().nullable(),
  GlobalJudgmentsQ9: z.string().nullable(),
  GlobalJudgmentsQ10: z.string().nullable(),
  DentalStatusQ11: z.string().nullable(),
  DentalStatusQ12: z.string().nullable(),
  DentalStatusQ13: z.string().nullable(),
  DentalStatusQ14: z.string().nullable(),
})

export { aimsSchema, type AimsSchemaType }
