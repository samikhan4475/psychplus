import { z } from 'zod'

type SnapIvSchemaType = {
  [key: string]: string
}

const snapIvSchema = z.object({
  InattentionQ1: z.string().nullable(),
  InattentionQ2: z.string().nullable(),
  InattentionQ3: z.string().nullable(),
  InattentionQ4: z.string().nullable(),
  InattentionQ5: z.string().nullable(),
  InattentionQ6: z.string().nullable(),
  InattentionQ7: z.string().nullable(),
  InattentionQ8: z.string().nullable(),
  InattentionQ9: z.string().nullable(),
  'Hyperactivity/ImpulsivityQ10': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ11': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ12': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ13': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ14': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ15': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ16': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ17': z.string().nullable(),
  'Hyperactivity/ImpulsivityQ18': z.string().nullable(),
  'Opposition/DefianceQ19': z.string().nullable(),
  'Opposition/DefianceQ20': z.string().nullable(),
  'Opposition/DefianceQ21': z.string().nullable(),
  'Opposition/DefianceQ22': z.string().nullable(),
  'Opposition/DefianceQ23': z.string().nullable(),
  'Opposition/DefianceQ24': z.string().nullable(),
  'Opposition/DefianceQ26': z.string().nullable(),
})

export { snapIvSchema, type SnapIvSchemaType }
