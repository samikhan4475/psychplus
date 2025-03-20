import { z } from 'zod'

type CodesWidgetSchemaType = z.infer<typeof codesWidgetSchema>

const codesWidgetSchema = z.object({
  cptAddonCodes: z.array(z.string()),
})

export { codesWidgetSchema, type CodesWidgetSchemaType }
