import { SelectOptionType } from '@/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { PatientMedicationFilterSchemaType } from './filter-form'
import { PatientMedicationSchemaType } from './patient-medication-dialog'
import {
  MedicationType,
  PatientMedicationFilterValues,
  Prescription,
} from './types'

const transformInOptions = (
  options: SelectOptionType[] = [],
): SelectOptionType[] => [
  {
    value: 'NotSet',
    label: 'Select',
  },
  ...options,
]

const transformOutPatientMedication = (
  {
    medicationType,
    pharmacyId,
    prescribedStatus,
    drugs = [],
    pharmacyNcpdpId,
  }: PatientMedicationSchemaType,
  patientId: number,
  appointmentId: number,
): Partial<Prescription>[] =>
  drugs?.map((drug) =>
    sanitizeFormData({
      id: drug?.id,
      patientId,
      prescriptionDate: drug?.prescriptionDate ?? '',
      prescriptionType: drug?.prescriptionType ?? '',
      locationId: 'EA646A1B-B967-4F92-A48C-EFF413B73762',
      dataSourceType: drug?.dataSourceType ?? '',
      prescribingStaffId: Number(drug.prescribingStaffId),
      pharmacyNcpdpId : pharmacyNcpdpId,
      prescribedStatus:
        medicationType === MedicationType.Prescribed
          ? prescribedStatus
          : undefined,
      prescriptionStatusType: drug.prescriptionStatusType,
      notes: drug.instructionOrNotes,
      appointmentId,
      pharmacyId:
        medicationType === MedicationType.Prescribed ? pharmacyId : undefined,
      recordStatus: drug?.recordStatus,
      prescriptionDrugs: [
        sanitizeFormData({
          id: drug.prescriptionDrugId ?? '',
          recordStatus: drug?.recordStatus,
          medicationStatus: drug?.medicationStatus,
          prescriptionId: drug?.id ?? '',
          drugDescription: drug.prescribableDrugDesc,
          quantityValue: Number(drug?.quantityValue),
          rxNormCode: String(drug.rxNormCode),
          quantityCodeListQualifier: '38',
          quantityUnitOfMeasureCode: drug?.quantityUnitOfMeasureCode ?? '',
          writtenDate: drug?.writtenDate,
          isSubstitutionsAllowed: (() => {
            if (drug?.isSubstitutionsAllowed === undefined) return false
            if (drug.isSubstitutionsAllowed === 'yes') return false
            return true
          })(),
          refills: Number(drug.refills),
          isMedicationAsNeeded: drug?.isMedicationAsNeeded,
          reasonForPrn: drug.reasonForPrn,
          startDateTime: `${drug.startDateTime}T${drug.startTime}:00Z`,
          effectiveDate: `${drug.effectiveDate}T${drug.effectiveTime}:00Z`,
          endDateTime: drug.endDateTime && drug.endTime ?  `${drug.endDateTime}T${drug.endTime}:00Z` : '',
          isControlledSubstance: drug?.isControlledSubstance,
          DrugCodeQualifier: drug?.DrugCodeQualifier ?? 'ND',
          drugCode: drug?.drugCode ?? '',
          DeaSchedule: drug?.DeaSchedule,
          DrugNote:drug.instructionOrNotes,
          DaysSupply: Number(drug.duration),
        }),
      ],
      prescriptionSignatures: [
        sanitizeFormData({
          id: drug.prescriptionSignatureId,
          recordStatus: drug?.recordStatus,
          description: drug.sigDescription,
          doseStrength: drug.doseStrength,
          doseUnitCode: drug.doseUnitCode,
          doseFormCode: drug.doseFormCode,
          doseRouteCode: drug.doseRouteCode,
          doseFrequencyCode: drug.doseFrequencyCode,
          duration: Number(drug.duration),
          durationUnitCode: drug.durationUnitCode,
          prescriptionId: drug.id,
          prescriptionDrugId: drug.prescriptionDrugId,
        }),
      ],
      prescriptionDiagnoses: drug?.diagnosis?.map((diagnosis) =>
        sanitizeFormData({
          id:
            diagnosis.id && typeof diagnosis.id === 'string'
              ? diagnosis.id
              : undefined,
          prescriptionId: drug.id,
          diagnosisCode: diagnosis.code,
          DiagnosisQualifierCode: 'ABF',
        }),
      ),
    }),
  )
const transformOutFilterValues = ({
  writtenDate,
  endDate,
  recordStatuses,
  medicationStatuses,
  ...data
}: PatientMedicationFilterSchemaType): PatientMedicationFilterValues =>
  sanitizeFormData({
    writtenDate: formatDateToISOString(writtenDate) ?? '',
    endDate: formatDateToISOString(endDate, true) ?? '',
    recordStatuses:
      transformOutOption(recordStatuses) && recordStatuses
        ? [recordStatuses]
        : undefined,
    medicationStatuses:
      transformOutOption(medicationStatuses) && medicationStatuses
        ? [medicationStatuses]
        : undefined,
    ...data,
  })
const transformOutOption = (value = '') =>
  value === 'NotSet' ? undefined : value
export {
  transformInOptions,
  transformOutPatientMedication,
  transformOutOption,
  transformOutFilterValues,
}
