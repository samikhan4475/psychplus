import { DateValue } from '@internationalized/date'
import { z } from 'zod'

const booleanOptional = z.boolean().optional()

const pastMedicalHxSchema = z.object({
  widgetContainerCheckboxField: z.string().optional(),
  asthma: booleanOptional,
  copd: booleanOptional,
  htn: booleanOptional,
  hld: booleanOptional,
  dm: booleanOptional,
  autoimmune: booleanOptional,
  cad: booleanOptional,
  stroke: booleanOptional,
  migraines: booleanOptional,
  headInjury: booleanOptional,
  seizures: booleanOptional,
  parkinsons: booleanOptional,
  cirrhosis: booleanOptional,
  hepatitis: booleanOptional,
  hiv: booleanOptional,
  sleepApnea: booleanOptional,
  gerd: booleanOptional,
  adhdAge: booleanOptional,
  multipleSclerosis: booleanOptional,
  kidneyDisease: booleanOptional,
  kidneyStones: booleanOptional,
  hypothyroidism: booleanOptional,
  anemia: booleanOptional,
  alzheimers: booleanOptional,
  pregnant: booleanOptional,
  pregnantDate: z.custom<DateValue | null>().optional(),
  breastFeeding: booleanOptional,
  breastFeedingDaysPostPartum: z.coerce.number().optional(),
  communicable: booleanOptional,
  measles: booleanOptional,
  mumps: booleanOptional,
  rubella: booleanOptional,
  chickenPox: booleanOptional,
  syphilis: booleanOptional,
  rash: booleanOptional,
  glaucoma: booleanOptional,
  chlamydias: booleanOptional,
  gonorrhea: booleanOptional,
  gastricBypass: booleanOptional,
  other: booleanOptional,
  otherDetails: z
    .string()
    .max(500, 'Max 500 characters are allowed')
    .optional(),
})

type PastMedicalHxSchemaType = z.infer<typeof pastMedicalHxSchema>

export { pastMedicalHxSchema, type PastMedicalHxSchemaType }
