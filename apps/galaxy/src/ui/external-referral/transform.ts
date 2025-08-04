import { Gender, InsurancePolicyPriority, NewPatient } from '@/types'
import {
  formatDateOfBirth,
  getMaskedPhoneNumber,
  getOptionalDateString,
  getPatientCity,
  getPatientGender,
  getPatientInsuranceName,
  getPatientMRN,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getSlashedPaddedDateString,
  sanitizeFormData,
} from '@/utils'
import { ExternalReferralSchemaType } from './external-referral-filter-form'
import { Patient, SearchPatientsParams } from './types'

const transformOut = (
  data: ExternalReferralSchemaType,
): SearchPatientsParams => {
  const {
    patientDateOfBirth,
    hasGuardian,
    contactMadeStatusList,
    patientCreatedFrom,
    patientCreatedTo,
    insurancePolicyIds,
    ...rest
  } = data

  return sanitizeFormData({
    ...rest,
    patientCreatedFrom: getOptionalDateString(patientCreatedFrom),
    patientCreatedTo: getOptionalDateString(patientCreatedTo),
    patientDateOfBirth: getOptionalDateString(patientDateOfBirth),
    insurancePolicyIds,
    contactMadeStatusList: contactMadeStatusList
      ? [contactMadeStatusList]
      : undefined,
    ...(hasGuardian ? { hasGuardian: hasGuardian === 'yes' } : {}),
    ...(insurancePolicyIds?.length
      ? { insurancePriority: InsurancePolicyPriority.Primary }
      : {}),
  })
}

const transformResponseData = (data: Patient[]): Patient[] =>
  data.map(
    ({
      patientGender,
      mostRecentAppointmentDate,
      upcomingAppointmentDate,
      ...item
    }) => ({
      mrn: getPatientMRN(item?.id),
      dob: formatDateOfBirth(item?.patientDateOfBirth),
      phoneNumber: getMaskedPhoneNumber(
        getPatientPhone(item?.contactDetails?.phoneNumbers) ?? '',
      ),
      residence: getPatientState(item?.contactDetails?.addresses),
      city: getPatientCity(item?.contactDetails?.addresses),
      state: getPatientState(item?.contactDetails?.addresses),
      zip: getPatientPostalCode(item?.contactDetails?.addresses),
      userCreated: getSlashedPaddedDateString(item?.metadata?.createdOn),
      patientGender: getPatientGender(patientGender as Gender),
      upcomingAppointmentDate: upcomingAppointmentDate
        ? getSlashedPaddedDateString(upcomingAppointmentDate)
        : '',
      mostRecentAppointmentDate: mostRecentAppointmentDate
        ? getSlashedPaddedDateString(mostRecentAppointmentDate)
        : '',
      insurance: getPatientInsuranceName(item?.insurancePolicies),
      ...item,
      patientLastLoginDateTime: item?.patientLastLoginDateTime,
    }),
  )

const transformOutPatientRow = (patient: Patient): NewPatient => ({
  user: {
    id: Number(patient.patientId),
    legalName: patient.patientName,
  },
  accessToken: String(patient.patientId),
  patientMrn: patient.patientExternalMrn,
  gender: patient.gender,
  dob: patient.patientDateOfBirth
    ? formatDateOfBirth(patient.patientDateOfBirth)
    : '',
})

export { transformResponseData, transformOut, transformOutPatientRow }
