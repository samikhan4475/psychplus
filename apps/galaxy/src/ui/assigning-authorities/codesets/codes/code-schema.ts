import z from 'zod'
import { codeValidation, descriptionValidation } from '../../form-validations'

const schema = z.object({
  newCodesetCode: z
    .object({
      id: z.string(),
      codesetId: z.string(),
      code: codeValidation,
      displayName: descriptionValidation,
    })
    .optional(),
  editableCodesetCode: z
    .object({
      id: z.string(),
      codesetId: z.string(),
      code: codeValidation,
      displayName: descriptionValidation,
    })
    .optional(),
})

type SchemaType = z.infer<typeof schema>

export { schema, type SchemaType }
