import z from 'zod'

const drugSignatureSchema = z.object({
  id: z.string().uuid(),
  signatureText: z.string(),
})

const drugDiagnosisSchema = z.object({
  id: z.string().uuid(),
  diagnosisCode: z.string(),
  notificationId: z.string().optional(),
  pharmacyNotificationDrugId: z.string().optional(),
  diagnosisCodeQualifier: z.string().optional(),
  diagnosisDescription: z.string().optional(),
})
const addressSchema = z.object({
  type: z.string().optional(),
  street1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
})

const legalNameSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  honors: z.string().optional(),
})

const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  addresses: z.array(addressSchema).optional(),
})

const staffSchema = z.object({
  id: z.coerce.string(),
  userId: z.coerce.string(),
  isTest: z.boolean(),
  legalName: legalNameSchema,
  staffRoleCode: z.string(),
  contactInfo: contactInfoSchema,
  spokenLanguages: z.array(z.string()).optional(),
  hasPhoto: z.boolean(),
  hasBioVideo: z.boolean(),
  npi: z.string().optional(),
  gender: z.string().optional(),
  phoneContact: z.string().optional(),
  dateOfBirth: z.string().optional(),
  isDefaultCosigner: z.boolean(),
  isMailingAddressSameAsPrimary: z.boolean(),
})
const drugSchema = z.object({
  id: z.string().uuid().optional(),
  notificationId: z.string().uuid().optional(),
  metadata: z.any().optional(),
  drugDescription: z.string().optional(),
  quantityValue: z.coerce.string().optional(),
  quantityCodeListQualifier: z.string().optional(),
  quantityUnitOfMeasureCode: z.string().optional(),
  medicationType: z.string(),
  isSubstitutionsAllowed: z.boolean().optional(),
  startDateTime: z.string().optional(),
  doseStrength: z.string().optional(),
  doseFormCode: z.string().optional(),
  doseUnitCode: z.string().optional(),
  drugCode: z.string().optional(),
  drugCodeQualifier: z.string().optional(),
  rxNormCode: z.string().optional(),
  daysSupply: z.number().optional(),
  writtenDate: z.string().datetime().optional(),
  lastFillDate: z.string().datetime().optional(),
  refills: z.coerce.string().optional(),
  isMedicationAsNeeded: z.boolean().optional(),
  reasonForMedicationAsNeeded: z.string().optional(),
  endDateTime: z.string().optional(),
  otherMedicationDate: z.string().datetime().optional(),
  otherMedicationDateQualifier: z.string().optional(),
  drugSignatureList: z.array(drugSignatureSchema).optional(),
  drugDiagnosisList: z.array(drugDiagnosisSchema).optional(),
  duration: z.string().optional(),
  startTime: z.ostring().optional(),
  endTime: z.ostring().optional(),
  reasonForPrn: z.string().optional(),
  notes: z.string().optional(),
  drugNote: z.string().optional(),
  deniedReason: z.string().optional(),
  priorAuthorizationCode: z.string().optional(),
  priorAuthorizationStatus: z.string().optional(),
})

const schema = z.object({
  pharmacyNotificationId: z.string().uuid(),
  notificationDateTime: z.string().datetime(),
  notificationType: z.string().optional(),
  recordSource: z.string().optional(),
  staffId: z.coerce.string().optional(),
  staff: staffSchema.optional(),
  pharmacyNcpdpId: z.string().optional(),
  pharmacyName: z.string().optional(),
  transactionId: z.string().optional(),
  notificationReferenceId: z.string(),
  patientId: z.coerce.string(),
  patientLastName: z.string(),
  patientFirstName: z.string(),
  patientGender: z.string(),
  patientDateOfBirth: z.string().datetime(),
  patientAddressLine1: z.string(),
  patientCity: z.string(),
  patientStateCode: z.string(),
  patientCountryCode: z.string(),
  integrationJournalId: z.string().uuid().optional(),
  rxReferenceNumber: z.string().optional(),
  rxChangeRequestCode: z.string().optional(),
  pharmacyAddress: z.object({
    type: z.string().min(1, 'Type is required'),
    street1: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  drugList: z.array(drugSchema).optional().nullable(),
})

type UpdateMedicationSchema = z.infer<typeof schema>
export { schema, type UpdateMedicationSchema }
