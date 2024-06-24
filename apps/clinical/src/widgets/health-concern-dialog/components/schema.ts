import z from 'zod'
import { validate } from '@psychplus/form'

const schema = z.object({
  healthConcernDate: validate.requiredString,
  healthConcernTime: validate.requiredString,
  symptomCode: validate.requiredString,
  symptomCodesetUsed: validate.requiredString,
  notes: validate.anyString,
  symptomCodeDescription: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
