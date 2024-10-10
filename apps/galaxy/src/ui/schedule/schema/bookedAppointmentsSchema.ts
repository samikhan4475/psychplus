import { DateValue, TimeValue } from 'react-aria-components'
import z from 'zod'

const dateValidation = z.custom<DateValue>()

const bookedAppointmentsSchema = z.object({
  startingDate: dateValidation.optional(),
  endingDate: dateValidation.optional(),
  name: z.string().optional(),
  age: z.coerce.number().optional(),
  gender: z.string().optional(),
  stateId: z.string().optional(),
  time: z.custom<TimeValue>(),
  dateOfBirth: dateValidation.optional(),
  patientStatuses: z.string().optional(),
  locationId: z.string().optional(),
  serviceIds: z
    .array(z.string())
    .refine((value) => value.every((item) => typeof item === 'string'), {
      message: 'Array must be empty or contain only strings',
    }),
  providerType: z.string().optional(),
  providerIds: z.string().optional(),
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
  authorizationNumber: z.string().optional(),
  cptCode: z.string().optional(),
  dateOfAdmissionStart: dateValidation.optional(),
  dateOfAdmissionEnd: dateValidation.optional(),
  lengthOfStayMin: z.coerce.number().optional(),
  lengthOfStayMax: z.coerce.number().optional(),
  lastCoverageDateStart: dateValidation.optional(),
  lastCoverageDateEnd: dateValidation.optional(),
  legalStatus: z.string().optional(),
  copayDueMin: z.coerce.number().optional(),
  copayDueMax: z.coerce.number().optional(),
  coInsuranceDueMin: z.coerce.number().optional(),
  coInsuranceDueMax: z.coerce.number().optional(),
  balanceDueMin: z.coerce.number().optional(),
  balanceDueMax: z.coerce.number().optional(),
  isNoteSigned: z.string().optional(),
})

type BookedAppointmentsSchemaType = z.infer<typeof bookedAppointmentsSchema>

export { bookedAppointmentsSchema, type BookedAppointmentsSchemaType }
