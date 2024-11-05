import { z } from 'zod'

type SpravatoSchemaType = {
  [key: string]: string | boolean
}

const spravatoSchema = z.object({
  treatmentNumber: z.string(),
  doesAdministered: z.string(),
  lotNumber: z.string(),
  medicationAssessment: z.boolean(),
  benzodiazepines: z.string(),
  nonBenzodiazepineSedativeHypnotic: z.string(),
  psychostimulants: z.string(),
  monoamineOxidaseInhibitors: z.string(),
  aneurysmalVascularDisease: z.boolean(),
  pregnancyStatus: z.boolean(),
  adverseReactionsEducation: z.boolean(),
  postTreatmentSafety: z.boolean(),
})

export { spravatoSchema, type SpravatoSchemaType }
