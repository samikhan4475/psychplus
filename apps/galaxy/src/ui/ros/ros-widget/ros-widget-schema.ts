import { z } from 'zod'

type RosWidgetSchemaType = z.infer<typeof rosWidgetSchema>

const rosWidgetSchema = z.object({
  constitutional: z.array(z.string()),
  entMouth: z.array(z.string()),
  eyes: z.array(z.string()),
  cardiovascular: z.array(z.string()),
  respiratory: z.array(z.string()),
  gastrointestinal: z.array(z.string()),
  genitourinary: z.array(z.string()),
  skin: z.array(z.string()),
  musculoskeletal: z.array(z.string()),
  neuro: z.array(z.string()),
})

export { rosWidgetSchema, type RosWidgetSchemaType }
