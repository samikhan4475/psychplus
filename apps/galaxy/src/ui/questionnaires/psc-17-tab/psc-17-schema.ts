import { z } from 'zod'

type Psc17SchemaType = {
  [key: string]: string
}

const psc17Schema = z.object({
  PscAttentionQ1: z.string().nullable(),
  PscAttentionQ2: z.string().nullable(),
  PscAttentionQ3: z.string().nullable(),
  PscAttentionQ4: z.string().nullable(),
  PscAttentionQ5: z.string().nullable(),
  PscInternalizingQ1: z.string().nullable(),
  PscInternalizingQ2: z.string().nullable(),
  PscInternalizingQ3: z.string().nullable(),
  PscInternalizingQ4: z.string().nullable(),
  PscInternalizingQ5: z.string().nullable(),
  PscExternalizingQ1: z.string().nullable(),
  PscExternalizingQ2: z.string().nullable(),
  PscExternalizingQ3: z.string().nullable(),
  PscExternalizingQ4: z.string().nullable(),
  PscExternalizingQ5: z.string().nullable(),
  PscExternalizingQ6: z.string().nullable(),
  PscExternalizingQ7: z.string().nullable(),
})

export { psc17Schema, type Psc17SchemaType }
