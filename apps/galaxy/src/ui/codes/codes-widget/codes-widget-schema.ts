import { z } from 'zod'

type CodesWidgetSchemaType = z.infer<typeof codesWidgetSchema>

const codesWidgetSchema = z.object({
  cptPrimaryCodes: z.array(z.string()).min(1, 'Required'),
  cptmodifierCodes: z.array(z.string()),
  cptAddonCodes: z.array(z.string()),
})

export { codesWidgetSchema, type CodesWidgetSchemaType }
