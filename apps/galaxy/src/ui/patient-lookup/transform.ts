import { Gender, NewPatient, PatientProfile } from '@/types'
import {
  formatDate,
  getMaskedPhoneNumber,
  getOptionalDateString,
  getPatientAge,
  getPatientCity,
  getPatientDOB,
  getPatientFullName,
  getPatientGender,
  getPatientInsuranceName,
  getPatientMRN,
  getPatientPhone,
  getPatientPostalCode,
  getPatientState,
  getSlashedPaddedDateString,
  sanitizeFormData,
} from '@/utils'
import { PatientLookUpSchemaType } from './patient-filter-form'
import { Patient, SearchPatientsParams } from './types'

const transformOut = (data: PatientLookUpSchemaType): SearchPatientsParams => {
  const {
    patientCreatedFrom,
    patientCreatedTo,
    dateOfBirth,
    hasGuardian,
    consentVerificationStatus,
    creditCardVerificationStatus,
    contactMadeStatuses,
    ...rest
  } = data

  return sanitizeFormData({
    ...rest,
    patientCreatedFrom: getOptionalDateString(patientCreatedFrom),
    patientCreatedTo: getOptionalDateString(patientCreatedTo),
    dateOfBirth: getOptionalDateString(dateOfBirth),
    consentVerificationStatuses: consentVerificationStatus
      ? [consentVerificationStatus]
      : undefined,
    creditCardVerificationStatuses: creditCardVerificationStatus
      ? [creditCardVerificationStatus]
      : undefined,
      contactMadeStatuses: contactMadeStatuses
      ? [contactMadeStatuses]
      : undefined, 
    ...(hasGuardian ? { hasGuardian: hasGuardian === 'yes' } : {}),
  })
}

const transformResponseData = (data: PatientProfile[]): Patient[] =>
  data.map(
    ({
      gender,
      mostRecentAppointmentDate,
      upcomingAppointmentDate,
      ...item
    }) => ({
      name: getPatientFullName(item?.legalName),
      age: getPatientAge(item?.birthdate),
      mrn: getPatientMRN(item?.id),
      dob: getPatientDOB(item?.birthdate),
      phoneNumber: getMaskedPhoneNumber(
        getPatientPhone(item?.contactDetails?.phoneNumbers) ?? '',
      ),
      residence: getPatientState(item?.contactDetails?.addresses),
      city: getPatientCity(item?.contactDetails?.addresses),
      state: getPatientState(item?.contactDetails?.addresses),
      zip: getPatientPostalCode(item?.contactDetails?.addresses),
      userCreated: getSlashedPaddedDateString(item?.metadata?.createdOn),
      gender: getPatientGender(gender as Gender),
      upcomingAppointmentDate: upcomingAppointmentDate
        ? getSlashedPaddedDateString(upcomingAppointmentDate)
        : 'None',
      mostRecentAppointmentDate: mostRecentAppointmentDate
        ? getSlashedPaddedDateString(mostRecentAppointmentDate)
        : 'None',
      insurance: getPatientInsuranceName(item?.insurancePolicies),
      ...item,
    }),
  )

const transformOutPatientRow = ({
  id,
  legalName: { firstName = '', lastName = '', middleName = '' },
  birthdate,
  mrn = '',
  status = '',
  gender = '',
  state = '',
}: Patient): NewPatient => ({
  user: {
    id,
    legalName: {
      firstName,
      lastName,
      middleName,
    },
  },
  accessToken: String(id),
  patientMrn: mrn,
  gender,
  dob: birthdate ? formatDate(birthdate) : '',
  patientStatus: status,
  state,
})

export { transformResponseData, transformOut, transformOutPatientRow }
