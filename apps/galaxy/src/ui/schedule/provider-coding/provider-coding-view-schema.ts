import { DateValue } from 'react-aria-components'
import z from 'zod'

const providerCodingViewSchema = z.object({
  startingDate: z.custom<DateValue>().optional(),
  endingDate: z.custom<DateValue>().optional(),
  name: z.string().optional(),
  age: z.coerce.number().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.custom<DateValue>().optional(),
  locationId: z.string().optional(),
  serviceIds: z
    .array(z.string())
    .refine((value) => value.every((item) => typeof item === 'string'), {
      message: 'Array must be empty or contain only strings',
    }),
  providerType: z.string().optional(),
  unitId: z.string().optional(),
  room: z.string().optional(),
  groupId: z.string().optional(),
  primaryInsuranceName: z.string().optional(),
  secondaryInsuranceName: z.string().optional(),
  visitType: z.string().optional(),
  visitSequence: z.string().optional(),
  visitMedium: z.string().optional(),
  visitStatus: z.string().optional(),
  patientInsuranceVerificationStatus: z.string().optional(),
  diagnosisCode: z.string().optional(),
  cptCode: z.string().optional(),
  dateOfAdmissionStart: z.custom<DateValue>().optional(),
  dateOfAdmissionEnd: z.custom<DateValue>().optional(),
  lengthOfStayMin: z.coerce.number().optional(),
  lengthOfStayMax: z.coerce.number().optional(),
  lastCoverageDateStart: z.custom<DateValue>().optional(),
  lastCoverageDateEnd: z.custom<DateValue>().optional(),
  legalStatus: z.string().optional(),
  copayDueMin: z.coerce.number().optional(),
  copayDueMax: z.coerce.number().optional(),
  coInsuranceDueMin: z.coerce.number().optional(),
  coInsuranceDueMax: z.coerce.number().optional(),
  balanceDueMin: z.coerce.number().optional(),
  balanceDueMax: z.coerce.number().optional(),
  isNoteSigned: z.string().optional(),
})

type ProviderCodingSchema = z.infer<typeof providerCodingViewSchema>

export { providerCodingViewSchema, type ProviderCodingSchema }
