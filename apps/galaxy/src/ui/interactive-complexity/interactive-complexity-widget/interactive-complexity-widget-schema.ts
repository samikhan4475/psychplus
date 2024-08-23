import { z } from 'zod'

type InteractiveComplexityWidgetSchemaType = z.infer<
  typeof interactiveComplexityWidgetSchema
>

const interactiveComplexityWidgetSchema = z.object({
  maladaptiveCommunication: z.boolean(),
  caregiverEmotions: z.boolean(),
  sentinelEvent: z.boolean(),
  languageBarrier: z.boolean(),
})

export {
  interactiveComplexityWidgetSchema,
  type InteractiveComplexityWidgetSchemaType,
}
