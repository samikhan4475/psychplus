import { DateValue } from 'react-aria-components'
import z from 'zod'

// Define Claim ServiceLines schema
const claimServiceLinesSchema = z
  .object({
    id: z.string().optional(),
    recordStatus: z.string().optional(),
    claimId: z.string(),
    chargeId: z.string().optional(),
    cptCode: z.string().min(1, 'Enter CPT Code').optional(),
    placeOfService: z.string().min(1, 'Enter POS').optional(),
    cptDescription: z.string().optional(),
    nationalDrugCode: z.string().optional(),
    modifierCode1: z.string().optional(),
    modifierCode2: z.string().optional(),
    modifierCode3: z.string().optional(),
    modifierCode4: z.string().optional(),
    diagnosisPointer1: z.string().optional(),
    diagnosisPointer2: z.string().optional(),
    diagnosisPointer3: z.string().optional(),
    diagnosisPointer4: z.string().optional(),
    serviceLineNotes: z.string().optional(),
    authorizationNumber: z.string().optional(),
    deletedReason: z.string().optional(),
    minutes: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    sequenceNo: z.coerce.number().optional(),
    dateOfServiceFrom: z.custom<DateValue>().optional(),
    dateOfServiceTo: z.custom<DateValue>().optional(),
    units: z.coerce.number().optional(),
    nationalDrugCodeMeasureUnit: z.string().optional(),
    unitAmount: z.coerce.number().min(0).optional(),
    totalAmount: z.coerce.number().optional(),
    isDoNotBill: z.boolean(),
    statusCode: z.string().optional(),
    isAnesthesia: z.boolean(),
  })
  .superRefine((line, ctx) => {
    if (line.recordStatus !== 'Active') return

    const pointers = [
      line.diagnosisPointer1,
      line.diagnosisPointer2,
      line.diagnosisPointer3,
      line.diagnosisPointer4,
    ]

    const hasAtLeastOnePointer = pointers.some((pointer) => pointer?.trim())
    if (!hasAtLeastOnePointer) {
      ctx.addIssue({
        code: 'custom',
        path: ['diagnosisPointer1'],
        message: 'At least one diagnosis pointer is required',
      })
    }

    const uniquePointers = new Set(pointers.filter(Boolean))
    if (uniquePointers.size !== pointers.filter(Boolean).length) {
      ctx.addIssue({
        code: 'custom',
        path: ['diagnosisPointer1'],
        message: 'Diagnosis pointers must be unique',
      })
    }

    let lastFilledIndex = -1
    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i]?.trim()) {
        if (i !== lastFilledIndex + 1) {
          ctx.addIssue({
            code: 'custom',
            path: [`diagnosisPointer${i + 1}`],
            message: 'Diagnosis pointers must be filled in sequence',
          })
          break
        }
        lastFilledIndex = i
      }
    }

    pointers.forEach((pointer, index) => {
      if (pointer && Number(pointer) > 12) {
        ctx.addIssue({
          code: 'custom',
          path: [`diagnosisPointer${index + 1}`],
          message: 'Enter valid pointer',
        })
      }
    })
  })

const claimDiagnosisSchema = z.object({
  id: z.string().optional(),
  recordStatus: z.string().optional(),
  claimId: z.string().optional(),
  diagnosisCode: z.string().optional(),
  diagnosisDescription: z.string().optional(),
  deletedReason: z.string().optional(),
  sequenceNo: z.coerce.number().optional(),
})

// Define Claim Ins schema
const claimInsurancePoliciesSchema = z.object({
  effectiveDate: z.string().optional(),
  groupNumber: z.string().optional(),
  hasCardBackImage: z.boolean().optional(),
  hasCardFrontImage: z.boolean().optional(),
  id: z.string().optional(),
  insurancePlanId: z.string().optional(),
  insurancePolicyPriority: z.string().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isPatientPolicyHolder: z.boolean().optional(),
  memberId: z.string().optional(),
  policyName: z.string().optional(),
  terminationDate: z.string().optional(),
  verificationStatus: z.string().optional(),
  policyHolderRelationship: z.string().optional(),
})
const providerSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  honors: z.string().optional(),
})

const metadataSchema = z.object({
  createdOn: z.string(),
  createdBy: z.number().optional(),
  createdByFullName: z.string().optional(),
  updatedOn: z.string().optional(),
  updatedBy: z.number().optional(),
  updatedByFullName: z.string().optional(),
  deletedOn: z.string().optional(),
  deletedBy: z.number().optional(),
  deletedByFullName: z.string().optional(),
})

// Define Claim update Schema
const claimUpdateSchema = z
  .object({
    id: z.string().uuid().optional(),
    recordStatus: z.string().optional(),
    practiceId: z.string().optional(),
    appointmentId: z.number().optional(),
    claimNumber: z.string(),
    locationId: z.string().optional(),
    renderingProviderId: z.string().min(1, 'Select Rendering Provider'),
    attendingProviderId: z.string().optional(),
    supervisingProviderId: z.string().optional(),
    orderingProviderId: z.string().optional(),
    referringProviderId: z.string().optional(),
    patientId: z.coerce.number().optional(),
    placeOfService: z.string().optional(),
    dateOfServiceFrom: z.custom<DateValue>().optional(),
    dateOfServiceTo: z.custom<DateValue>().optional(),
    claimType: z.string().optional(),
    authorizationNumber: z.string().optional(),
    referralNumber: z.string().optional(),
    clinicalLaboratoryImprovementAmendmentsNumber: z
      .union([
        z
          .string()
          .min(10, 'CLIA # must be at least 10 characters long.')
          .max(10, 'CLIA # must be at least 10 characters long.')
          .trim(),
        z.literal(''),
      ])
      .optional()
      .refine((val) => val === undefined || val === '' || val.length === 10, {
        message: 'CLIA # must be at least 10 characters long.',
      }),
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
    isMarkAsSubmitted: z.boolean(),
    isSubmitted: z.boolean(),
    submittedDate: z.custom<DateValue>().optional(),
    submissionBatchId: z.string().optional(),
    systemValidationMessage: z.string().optional(),
    rejectionReason: z.string().optional(),
    isHoldStatement: z.boolean(),
    isResubmitted: z.boolean(),
    isForcePaper: z.boolean(),
    isSelfPay: z.boolean(),
    isDraft: z.boolean(),
    isHold: z.boolean(),
    isClaimScrubbed: z.boolean(),
    isForceUnlock: z.boolean(),
    forceUnlockDate: z.custom<DateValue>().optional(),
    forceUnlockReason: z.string().optional(),
    primaryPatientInsurancePolicyId: z.string().optional(),
    secondaryPatientInsurancePolicyId: z.string().optional(),
    tertiaryPatientInsurancePolicyId: z.string().optional(),
    accidentDate: z.custom<DateValue>().optional(),
    accidentState: z.string().optional(),
    accidentType: z.string().optional(),
    isOutsideLab: z.boolean(),
    labCharges: z.coerce.number().optional(),
    isEmployment: z.boolean(),
    isAutoAccident: z.boolean(),
    isOtherAccident: z.boolean(),
    claimFrequencyCode: z.string().min(1, { message: 'Required' }),
    lastSeenDate: z.custom<DateValue>().optional(),
    onsetOfCurrentIllness: z.custom<DateValue>().optional(),
    firstSimilarIllness: z.custom<DateValue>().optional(),
    lastMenstrualPeriod: z.custom<DateValue>().optional(),
    admissionDate: z.custom<DateValue>().optional(),
    dischargeDate: z.custom<DateValue>().optional(),
    lastXRayDate: z.custom<DateValue>().optional(),
    lastXRayType: z.string().optional(),
    startDateOfInabilityToWork: z.custom<DateValue>().optional(),
    endDateOfInabilityToWork: z.custom<DateValue>().optional(),
    patientName: z.string(),
    patientAccountNumber: z.string().optional(),
    patientDateOfBirth: z.string(),
    patientGender: z.string(),
    claimInsurancePolicies: z.array(claimInsurancePoliciesSchema),
    claimServiceLines: z.array(claimServiceLinesSchema),
    updatedByName: z.string().optional(),
    renderingProviderName: providerSchema.optional(),
    attendingProviderName: providerSchema.optional(),
    supervisingProviderName: providerSchema.optional(),
    orderingProviderName: providerSchema.optional(),
    referringProviderName: providerSchema.optional(),
    metadata: metadataSchema.optional(),
    claimDiagnosis: z
      .array(claimDiagnosisSchema)

      .refine(
        (diagnosisArray) =>
          diagnosisArray.some(
            (diagnosis) => diagnosis.recordStatus === 'Active',
          ),
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
      )
      .refine(
        (diagnosisArray) =>
          diagnosisArray.every(
            (diagnosis) =>
              diagnosis.recordStatus === 'Deleted' ||
              (diagnosis.sequenceNo !== undefined && diagnosis.sequenceNo > 0),
          ),
        {
          message: 'All active diagnoses must have a valid sequence number.',
          path: ['claimDiagnosis'],
        },
      ),
  })
  .refine(
    (data) => {
      if (
        data.tertiaryPatientInsurancePolicyId &&
        !data.secondaryPatientInsurancePolicyId
      ) {
        return false
      }
      if (
        data.secondaryPatientInsurancePolicyId &&
        !data.primaryPatientInsurancePolicyId
      ) {
        return false
      }
      return true
    },
    {
      message:
        'Insurance policies must follow order: Primary, Secondary, Tertiary.',
      path: ['primaryPatientInsurancePolicyId'],
    },
  )
  .superRefine((data, ctx) => {
    const activeSequences = new Set(
      data.claimDiagnosis
        .filter((d) => d.recordStatus === 'Active')
        .map((d) => d.sequenceNo),
    )

    data.claimServiceLines.forEach((line, lineIndex) => {
      const pointers = [
        line.diagnosisPointer1,
        line.diagnosisPointer2,
        line.diagnosisPointer3,
        line.diagnosisPointer4,
      ]

      const invalidPointers = pointers
        .map((pointer, pointerIndex) => ({
          pointer,
          label: `diagnosisPointer${pointerIndex + 1}`,
        }))
        .filter(
          ({ pointer }) => pointer && !activeSequences.has(Number(pointer)),
        )

      if (invalidPointers.length > 0) {
        const invalidPointerMessages = invalidPointers
          .map(({ pointer }) => `${pointer}`)
          .join(', ')

        ctx.addIssue({
          code: 'custom',
          path: ['claimServiceLines', lineIndex, 'diagnosisPointer1'],
          message: `Pointer ${invalidPointerMessages} do not match any active diagnosis sequence.`,
        })
      }
    })
  })

type ClaimUpdateSchemaType = z.infer<typeof claimUpdateSchema>

export { claimUpdateSchema, type ClaimUpdateSchemaType }
