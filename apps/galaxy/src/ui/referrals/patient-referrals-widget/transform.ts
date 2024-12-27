import {
  NewPatient,
  PatientReferral,
  SelectOptionType,
  StaffResource,
} from '@/types'
import { formatDate, getPatientFullName, getPatientMRN } from '@/utils'

const PROVIDER_NAME_PRIFIX = '_providerName'

const transformInStaffOptions = (data: StaffResource[]): SelectOptionType[] => {
  return data.map((item) => {
    const label = getPatientFullName(item?.legalName)

    return {
      label,
      value: `${label}${PROVIDER_NAME_PRIFIX}${item.id}`,
    }
  })
}

const transformOutProviderNames = (data: string[] = []): string[] => {
  return data?.map((item) => item?.split(PROVIDER_NAME_PRIFIX)?.[0])
}

const transformOutPatientRow = ({
  id,
  patientName: { firstName = '', lastName = '', middleName = '' },
  patientDateOfBirth = '',
  patientId,
  patientStatus = '',
  patientGender = '',
  stateCode = '',
}: PatientReferral): NewPatient => ({
  user: {
    id,
    legalName: {
      firstName,
      lastName,
      middleName,
    },
  },
  accessToken: String(id),
  patientMrn: getPatientMRN(patientId),
  gender: patientGender,
  dob: patientDateOfBirth ? formatDate(patientDateOfBirth) : '',
  patientStatus,
  state: stateCode,
})
export {
  transformInStaffOptions,
  transformOutPatientRow,
  transformOutProviderNames,
}
