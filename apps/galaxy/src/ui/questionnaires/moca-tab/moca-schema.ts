import { z } from 'zod'

type MocaSchemaType = {
  [key: string]: string
}

const mocaSchema = z.object({
  VisuospatialExecutiveQ1: z.string().nullable(),
  VisuospatialExecutiveQ2: z.string().nullable(),
  VisuospatialExecutiveQ3: z.string().nullable(),
  NamingQ4: z.string().nullable(),
  NamingQ5: z.string().nullable(),
  NamingQ6: z.string().nullable(),
  AttentionQ7: z.string().nullable(),
  AttentionQ8: z.string().nullable(),
  AttentionQ9: z.string().nullable(),
  AttentionQ10: z.string().nullable(),
  LanguageQ11: z.string().nullable(),
  LanguageQ12: z.string().nullable(),
  LanguageQ13: z.string().nullable(),
  AbstractionQ14: z.string().nullable(),
  AbstractionQ15: z.string().nullable(),
  MemoryFaceQ1: z.string().nullable(),
  MemoryValvetQ1: z.string().nullable(),
  MemoryChurchQ1: z.string().nullable(),
  MemoryDaisyQ1: z.string().nullable(),
  MemoryRedQ1: z.string().nullable(),
  MemoryFaceQ2: z.string().nullable(),
  MemoryValvetQ2: z.string().nullable(),
  MemoryChurchQ2: z.string().nullable(),
  MemoryDaisyQ2: z.string().nullable(),
  MemoryRedQ2: z.string().nullable(),
  DelayedRecallFaceQ1: z.string().nullable(),
  DelayedRecallValvetQ1: z.string().nullable(),
  DelayedRecallChurchQ1: z.string().nullable(),
  DelayedRecallDaisyQ1: z.string().nullable(),
  DelayedRecallRedQ1: z.string().nullable(),
  DelayedRecallFaceQ2: z.string().nullable(),
  DelayedRecallValvetQ2: z.string().nullable(),
  DelayedRecallChurchQ2: z.string().nullable(),
  DelayedRecallDaisyQ2: z.string().nullable(),
  DelayedRecallRedQ2: z.string().nullable(),
  OrientationDateQ1: z.string().nullable(),
  OrientationMonthQ1: z.string().nullable(),
  OrientationDayQ1: z.string().nullable(),
  OrientationPlaceQ1: z.string().nullable(),
  OrientationCityQ1: z.string().nullable(),
})

export { mocaSchema, type MocaSchemaType }
