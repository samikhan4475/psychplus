import { z } from 'zod'

type CodesWidgetSchemaType = z.infer<typeof codesWidgetSchema>

const codesWidgetSchema = z.object({
  primaryCode: z.array(z.string()),
  modifierCode: z.array(z.string()),
  addOns: z.array(z.string()),
})

export { codesWidgetSchema, type CodesWidgetSchemaType }
