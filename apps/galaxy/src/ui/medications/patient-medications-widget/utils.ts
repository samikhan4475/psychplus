import { format, parseISO } from 'date-fns'
import {
  PatientProfile,
  PhoneNumber,
  SelectOptionType,
  SharedCode,
} from '@/types'
import {
  getLocalCalendarDate,
  getMaskedPhoneNumber,
  getPatientCity,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getPatientStreet,
} from '@/utils'
import { PatientMedicationSchemaType } from './patient-medication-dialog'
import { MedicationType, Prescription } from './types'

const getYesNoValue = (value?: boolean) => {
  if (value === undefined) return ''
  return value ? 'no' : 'yes'
}
const formatDiagnosisList = (drug: Prescription): string => {
  return (
    drug?.prescriptionDiagnoses
      ?.map(({ diagnosisCode, diagnosisDescription }) => {
        return `${diagnosisCode} ${diagnosisDescription}`
      })
      .join(', ') ?? ''
  )
}

const getPatientProfileAddress = (patientProfile?: PatientProfile) => {
  return patientProfile?.contactDetails?.addresses
    ? `${getPatientStreet(
        patientProfile.contactDetails.addresses,
      )}, ${getPatientCity(
        patientProfile.contactDetails.addresses,
      )}, ${getPatientState(
        patientProfile.contactDetails.addresses,
      )} ${getPatientPostalCode(patientProfile.contactDetails.addresses)}`
    : 'N/A'
}
const getPatientProfilePhone = (patientProfile?: PatientProfile) => {
  return getMaskedPhoneNumber(
    getPatientPhone(
      patientProfile?.contactDetails?.phoneNumbers as PhoneNumber[],
    ) as string,
  )
}

const getDoseQuantity = (codes: SharedCode[], value?: string) => {
  const attrs = codes?.find((item) => item.value === value)?.attributes
  return attrs?.find((attr) => attr?.name === 'DosesPerDayAmount')?.value
}
const getFieldName = <
  T extends keyof PatientMedicationSchemaType['drugs'][number],
>(
  drugIndex: number,
  nestedFieldName: T,
): `drugs.${number}.${T}` => {
  return `drugs.${drugIndex}.${nestedFieldName}`
}
const getIsoStringtoUtcDateTime = (medication?: Prescription) => {
  if (!medication) return undefined

  const prescriptionDrug = medication.prescriptionDrugs?.[0]
  const getDateTime = (isoDate?: string) => {
    if (!isoDate || isNaN(Date.parse(isoDate))) return undefined
    return {
      date: getLocalCalendarDate(isoDate),
      time: format(parseISO(isoDate), 'HH:mm'),
    }
  }

  const startDateTime = getDateTime(prescriptionDrug?.startDateTime)
  const endDateTime = getDateTime(prescriptionDrug?.endDateTime)

  return { startDateTime, endDateTime }
}

const getInitialValuesPatientMedication = (
  medication?: Prescription | undefined,
): PatientMedicationSchemaType => {
  if (!medication) {
    return {
      isSigning: false,
      medicationType: MedicationType?.Prescribed,
      prescribedStatus: '',
      pharmacyId: '',
      drugs: [],
    }
  }
  const prescriptionDrug = medication?.prescriptionDrugs?.[0] ?? {}
  const prescriptionSignature = medication?.prescriptionSignatures?.[0] ?? {}

  const dateValues = getIsoStringtoUtcDateTime(medication)
  return {
    isSigning: false,
    medicationType: medication?.prescribedStatus
      ? MedicationType.Prescribed
      : MedicationType.Home,
    pharmacyId: medication?.pharmacyId ?? '',
    prescribedStatus: medication?.prescribedStatus ?? '',
    drugs: [
      {
        id: medication?.id ?? '',
        isControlledSubstance: prescriptionDrug?.isControlledSubstance ?? false,
        prescriptionDrugId: prescriptionDrug?.id ?? '',
        prescriptionSignatureId: prescriptionSignature?.id ?? '',
        writtenDate: prescriptionDrug?.writtenDate ?? '',
        prescriptionDate: medication?.prescriptionDate ?? '',
        prescriptionType: medication?.prescriptionType ?? '',
        drugCode: prescriptionDrug?.drugCode ?? '',
        dataSourceType: medication?.dataSourceType ?? '',
        recordStatus: medication?.recordStatus ?? '',
        prescribableDrugDesc: prescriptionDrug?.drugDescription ?? '',
        DrugCodeQualifier: prescriptionDrug?.drugCodeQualifier ?? '',
        doseFormCode: prescriptionSignature?.doseFormCode ?? '',
        DeaSchedule: prescriptionDrug?.deaSchedule,
        doseFrequencyCode: prescriptionSignature?.doseFrequencyCode ?? '',
        doseRouteCode: prescriptionSignature?.doseRouteCode ?? '',
        doseStrength: prescriptionSignature?.doseStrength ?? '',
        doseUnitCode: prescriptionSignature?.doseUnitCode ?? '',
        duration: String(prescriptionSignature?.duration ?? ''),
        durationUnitCode: prescriptionSignature?.durationUnitCode ?? '',
        DaysSupply:
          prescriptionDrug?.daysSupply !== null
            ? String(prescriptionDrug.daysSupply)
            : '',
        medicationStatus: prescriptionDrug?.medicationStatus ?? '',
        prescribingStaffId: String(medication?.prescribingStaffId ?? ''),
        refills: String(prescriptionDrug?.refills ?? ''),
        sigDescription: prescriptionSignature?.description ?? '',
        startDateTime: dateValues?.startDateTime?.date?.toString() ?? '',
        startTime: dateValues?.startDateTime?.time ?? '',
        endDateTime: dateValues?.endDateTime?.date?.toString() ?? '',
        endTime: dateValues?.endDateTime?.time ?? '',
        instructionOrNotes: medication?.notes ?? '',
        isMedicationAsNeeded: prescriptionDrug?.isMedicationAsNeeded ?? true,
        isSubstitutionsAllowed:
          getYesNoValue(prescriptionDrug?.isSubstitutionsAllowed) ?? '',

        prescriptionStatusType: medication?.prescriptionStatusType !== null ? String(medication.prescriptionStatusType) : '',
        quantityValue: String(prescriptionDrug?.quantityValue ?? ''),
        reasonForPrn: prescriptionDrug?.reasonForPrn ?? '',
        quantityUnitOfMeasureCode:
          prescriptionDrug?.quantityUnitOfMeasureCode ?? '',
        rxNormCode: prescriptionDrug?.rxNormCode
          ? Number(prescriptionDrug.rxNormCode)
          : undefined,
        diagnosis:
          medication?.prescriptionDiagnoses?.map((diagnosis) => ({
            id: String(diagnosis?.id ?? ''),
            code: diagnosis?.diagnosisCode ?? '',
            description: diagnosis?.diagnosisDescription ?? '',
            prescriptionId: String(diagnosis?.prescriptionId ?? ''),
          })) ?? [],
      },
    ],
  }
}
const getMedicationStatusLabel = (options: SelectOptionType[], value: string) =>
  options?.find((opt) => opt.value === value)?.label
const formatHeightWeight = (height?: number, weight?: number): string =>
  !height && !weight ? 'N/A' : `${height ?? 'N/A'}/${weight ?? 'N/A'}`

const getSurescriptsCode = (codes: SharedCode[], doseUnitCode?: string) => {
  const matchedCode = codes?.find(
    (code) => code?.value === doseUnitCode,
  )?.attributes
  return matchedCode?.find((attr) => attr?.name === 'SurescriptsCode')?.value
}
const getDrugUnitOptions = (codes: SharedCode[]) =>
  codes?.reduce((acc: SelectOptionType[], code) => {
    const sureScriptCode = code?.attributes?.find(
      (attr) => attr?.name === 'SurescriptsCode',
    )?.value
    if (sureScriptCode) {
      acc.push({ label: code.display, value: code.value })
    }
    return acc
  }, [])

export {
  getDoseQuantity,
  getFieldName,
  getDrugUnitOptions,
  getMedicationStatusLabel,
  getInitialValuesPatientMedication,
  getYesNoValue,
  getSurescriptsCode,
  formatDiagnosisList,
  getPatientProfileAddress,
  getPatientProfilePhone,
  formatHeightWeight
}
