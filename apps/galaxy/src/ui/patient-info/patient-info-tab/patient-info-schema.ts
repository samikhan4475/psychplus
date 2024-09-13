import z from 'zod'
import { additionalContactInfoSchema } from './additional-contact-info/additional-contact-info-schema'
import { createUserSchema } from './create-user'
import { descriptiveSchema } from './descriptive/descriptive-schema'
import { patientDataSchema } from './patient-data/patient-data-schema'

const patientInfoSchema = z.union([
  createUserSchema,
  descriptiveSchema,
  additionalContactInfoSchema,
  patientDataSchema,
])

type PatientInfoSchema = z.infer<typeof patientInfoSchema>

export { type PatientInfoSchema, patientInfoSchema }
