import z from 'zod'
import { MedicationType, PrescribedStatus } from '../../types'
import { ConfirmationMethod } from '../types'

const diagnosesSchema = z.object({
  id: z.ostring().or(z.onumber()),
  description: z.ostring(),
  code: z.ostring(),
  prescriptionId: z.ostring(),
})
const schema = z
  .object({
    medicationType: z
      .enum([MedicationType.Prescribed, MedicationType.Home])
      .default(MedicationType.Home),
    prescribedStatus: z.ostring(),
    pharmacyId: z.ostring(),
    prescriptionPharmacyName: z.ostring(),
    isAuthenticated: z.boolean().optional(),
    confirmationMethod: z
      .enum([ConfirmationMethod.Otp, ConfirmationMethod.Authenticator])
      .optional(),
    drugs: z.array(
      z
        .object({
          doseStrength: z.string().min(1, 'Required'),
          quantityValue: z.string().min(1, 'Required'),
          id: z.ostring(),
          prescriptionDrugId: z.ostring(),
          prescriptionSignatureId: z.ostring(),
          prescriptionDate: z.ostring(),
          prescriptionType: z.ostring(),
          doseUnitCode: z.string().min(1, 'Required').default(''),
          doseFormCode: z.ostring(),
          duration: z.ostring(),
          durationUnitCode: z.ostring(),
          doseRouteCode: z.ostring(),
          DrugCodeQualifier: z.ostring(),
          doseFrequencyCode: z.ostring(),
          refills: z.string().min(1, 'Required'),
          prescriptionStatusType: z.ostring(),
          dataSourceType: z.ostring(),
          startDateTime: z.ostring(),
          effectiveDate: z.string().min(1, 'Required'),
          endDateTime: z.ostring(),
          isMedicationAsNeeded: z.oboolean(),
          drugCode: z.ostring(),
          isSubstitutionsAllowed: z.ostring(),
          startTime: z.ostring(),
          endTime: z.ostring(),
          DeaSchedule: z.ostring(),
          quantityUnitOfMeasureCode: z.ostring(),
          reasonForPrn: z.ostring(),
          prescribingStaffId: z.string().min(1, 'Required'),
          supervisorStaffId: z.ostring(),
          prescriberAgentStaffId: z.ostring(),
          prescribingStaffName: z.ostring(),
          supervisedBy: z.ostring(),
          instructionOrNotes: z.ostring(),
          prescribableDrugDesc: z.ostring(),
          recordStatus: z.ostring(),
          writtenDate: z.ostring(),
          isControlledSubstance: z.oboolean(),
          epcsDrugSignedStatus: z.ostring(),
          rxNormCode: z.onumber(),
          sigDescription: z.string().min(1, 'Required'),
          medicationStatus: z.string().min(1, 'Required'),
          diagnosis: z.array(diagnosesSchema).optional(),
          DaysSupply: z.ostring().optional(),
        })
        .superRefine((drug, ctx) => {
          const durationRaw = drug.duration
          const unitRaw = drug.durationUnitCode

          const hasDuration =
            typeof durationRaw === 'string' &&
            durationRaw.trim() !== '' &&
            durationRaw.trim() !== '0'

          const hasUnit =
            typeof unitRaw === 'string' &&
            unitRaw.trim() !== '' &&
            unitRaw.trim() !== '0'

          if (hasDuration && !hasUnit) {
            ctx.addIssue({
              path: ['durationUnitCode'],
              code: z.ZodIssueCode.custom,
              message: 'Required',
            })
          }

          if (!hasDuration && hasUnit) {
            ctx.addIssue({
              path: ['duration'],
              code: z.ZodIssueCode.custom,
              message: 'Required',
            })
          }
        }),
    ),
    pharmacyNcpdpId: z.ostring(),
    isSigning: z.boolean().optional(),
    isReviewing: z.oboolean(),
  })
  .superRefine((data, ctx) => {
    const { prescribedStatus, pharmacyId } = data
    if (prescribedStatus === PrescribedStatus.Pharmacy && !pharmacyId) {
      ctx.addIssue({
        path: ['pharmacyId'],
        code: z.ZodIssueCode.custom,
        message: 'Required',
      })
    }
  })
type PatientMedicationSchemaType = z.infer<typeof schema>
type DiagnosesSchemaType = z.infer<typeof diagnosesSchema>
export { schema, type PatientMedicationSchemaType, type DiagnosesSchemaType }
