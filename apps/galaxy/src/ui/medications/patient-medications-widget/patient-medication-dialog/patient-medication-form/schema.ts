import z from 'zod'
import { MedicationType } from '../../types'

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
    pharmacyNcpdpId: z.ostring(),
    drugs: z.array(
      z.object({
        doseStrength: z.string().min(1, 'Required'),
        id: z.ostring(),
        prescriptionDrugId: z.ostring(),
        prescriptionSignatureId: z.ostring(),
        prescriptionDate: z.ostring(),
        prescriptionType: z.ostring(),
        doseUnitCode: z.string().min(1, 'Required'),
        doseFormCode: z.string().min(1, 'Required'),
        duration: z.string().min(1, 'Required'),
        durationUnitCode: z.string().min(1, 'Required'),
        doseRouteCode: z.string().min(1, 'Required'),
        DrugCodeQualifier: z.ostring(),
        doseFrequencyCode: z.string().min(1, 'Required'),
        quantityValue: z.ostring(),
        refills: z.string().min(1, 'Required'),
        prescriptionStatusType: z.ostring(),
        dataSourceType: z.ostring(),
        startDateTime: z.ostring(),
        endDateTime: z.ostring(),
        isMedicationAsNeeded: z.oboolean(),
        drugCode: z.ostring(),
        isSubstitutionsAllowed: z.ostring(),
        startTime: z.ostring(),
        endTime: z.ostring(),
        quantityUnitOfMeasureCode: z.ostring(),
        reasonForPrn: z.ostring(),
        prescribingStaffId: z.string().min(1, 'Required'),
        instructionOrNotes: z.ostring(),
        prescribableDrugDesc: z.ostring(),
        recordStatus: z.ostring(),
        writtenDate: z.ostring(),
        isControlledSubstance: z.oboolean(),
        rxNormCode: z.onumber(),
        sigDescription: z.string().min(1, 'Required'),
        medicationStatus: z.string().min(1, 'Required'),
        diagnosis: z.array(diagnosesSchema).optional(),
      }),
    ),
    isSigning: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const { prescribedStatus, pharmacyNcpdpId } = data
    if (prescribedStatus === 'Pharmacy' && !pharmacyNcpdpId) {
      ctx.addIssue({
        path: ['pharmacyNcpdpId'],
        code: z.ZodIssueCode.custom,
        message: 'Required',
      })
    }
  })
type PatientMedicationSchemaType = z.infer<typeof schema>
type DiagnosesSchemaType = z.infer<typeof diagnosesSchema>
export { schema, type PatientMedicationSchemaType, type DiagnosesSchemaType }
