import { DateValue } from 'react-aria-components'
import z from 'zod'

const providerSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  honors: z.string().optional(),
})

const diagnosisSchema = z.object({
  id: z.string().optional(),
  recordStatus: z.string().optional(),
  diagnosisCode: z.string().optional(),
  diagnosisDescription: z.string().optional(),
  sequenceNo: z.coerce.number().optional(),
})

const chargesSchema = z.object({
  recordStatus: z.string().optional(),
  cptCode: z.string().min(1, 'Enter CPT Code').optional(),
  modifierCode1: z.string().optional(),
  modifierCode2: z.string().optional(),
  modifierCode3: z.string().optional(),
  modifierCode4: z.string().optional(),
  deletedReason: z.string().optional(),
  sequenceNo: z.coerce.number().optional(),
  dateOfServiceFrom: z.custom<DateValue>().optional(),
  dateOfServiceTo: z.custom<DateValue>().optional(),
  units: z.coerce.number().min(1, 'Enter units').optional(),
  unitAmount: z.coerce.number().min(0).optional(),
  totalAmount: z.coerce.number().optional(),
  statusCode: z.string().optional(),
  diagnosisPointer1: z.string().optional(),
  diagnosisPointer2: z.string().optional(),
  diagnosisPointer3: z.string().optional(),
  diagnosisPointer4: z.string().optional(),
  placeOfService: z.string().optional(),
  isAnesthesia: z.boolean().optional(),
})

// Define Claim Add Schema
const addClaimSchema = z.object({
  id: z.string().uuid().optional(),
  recordStatus: z.string().optional(),
  practiceId: z.string().optional(),
  appointmentId: z.number().optional(),
  claimNumber: z.string().optional(),
  locationId: z.string().min(1, 'Required'),
  billingLocationId: z.string().min(1, 'Required'),
  renderingProviderId: z.string().min(1, 'Required'),
  patientAccountNumber: z.string().min(1, 'Patient Account is required'),
  patientName: z.string(),
  patientDateOfBirth: z.string(),
  patientGender: z.string(),
  placeOfService: z.string().min(1, 'Select POS'),
  patientId: z.coerce.number().optional(),
  dateOfServiceFrom: z.custom<DateValue>().optional(),
  dateOfServiceTo: z.custom<DateValue>().optional(),
  claimType: z.string().optional(),
  authorizationNumber: z.string().optional(),
  referralNumber: z.string().optional(),
  clinicalLaboratoryImprovementAmendmentsNumber: z.string().optional(),
  claimNotes: z.string().optional(),
  payerClaimControlNumber: z.string().optional(),
  primaryStatusCode: z.string().optional(),
  secondaryStatusCode: z.string().optional(),
  tertiaryStatusCode: z.string().optional(),
  patientStatusCode: z.string().optional(),
  createFrom: z.string().optional(),
  deletedReason: z.string().optional(),
  totalAmount: z.coerce.number().optional(),
  amountDue: z.coerce.number().optional(),
  primaryPaid: z.coerce.number().optional(),
  secondaryPaid: z.coerce.number().optional(),
  tertiaryPaid: z.coerce.number().optional(),
  patientPaid: z.coerce.number().optional(),
  totalWriteOff: z.coerce.number().optional(),
  claimStatusCode: z.string().optional(),
  submittedDate: z.custom<DateValue>().optional(),
  submissionBatchId: z.string().optional(),
  primaryPatientInsurancePolicyId: z.string().optional(),
  secondaryPatientInsurancePolicyId: z.string().optional(),
  tertiaryPatientInsurancePolicyId: z.string().optional(),
  lastSeenDate: z.custom<DateValue>().optional(),
  updatedByName: z.string().optional(),
  renderingProviderName: providerSchema.optional(),
  claimDiagnosis: z
    .array(diagnosisSchema)
    .refine(
      (diagnosisArray) =>
        diagnosisArray.some((diagnosis) => diagnosis.recordStatus === 'Active'),
      {
        message: 'At least one active diagnosis is required.',
        path: ['claimDiagnosis'],
      },
    )
    .refine(
      (diagnosisArray) =>
        diagnosisArray.filter(
          (diagnosis) => diagnosis.recordStatus === 'Active',
        ).length <= 12,
      {
        message: 'Claim diagnosis cannot have more than 12 active entries.',
        path: ['claimDiagnosis'],
      },
    ),
  claimServiceLines: z.array(chargesSchema),
})
type ClaimAddSchemaType = z.infer<typeof addClaimSchema>

export { addClaimSchema, type ClaimAddSchemaType }
