import { z } from 'zod'

type MseWidgetSchemaType = z.infer<typeof mseWidgetSchema>

const mseWidgetSchema = z.object({
  orientation: z.array(z.string()),
  appearance: z.array(z.string()),
  behavior: z.array(z.string()),
  psychomotor: z.array(z.string()),
  speech: z.array(z.string()),
  mood: z.array(z.string()),
  affect: z.array(z.string()),
  thoughtProcess: z.array(z.string()),
  thoughtContentSi: z.enum(['yes', 'no']),
  thoughtContentSiActivePassive: z.array(z.enum(['active', 'passive'])),
  thoughtContentHi: z.enum(['yes', 'no']),
  thoughtContentDelusions: z.enum(['yes', 'no']),
  thoughtContentHallucinations: z.enum(['yes', 'no']),
  thoughtContentOther: z.string(),
  memoryRecentIntact: z.enum(['yes', 'no']),
  memoryRemoteIntact: z.enum(['yes', 'no']),
  memoryHowTested: z.array(z.string()),
  memoryHowTestedOther: z.string(),
})

export { mseWidgetSchema, type MseWidgetSchemaType }
