import { DateValue } from 'react-aria-components'
import { FieldErrors } from 'react-hook-form'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import {
  ContactMadeStatuses,
  Insurance,
  NewPatient,
  PatientReferral,
  StaffResource,
} from '@/types'
import { convertToCalendarDate, formatDateOfBirth } from '@/utils'
import { IntReferralsPatientLookUpSchemaType } from './int-patient-filter-form'

const getInitialValues = (): IntReferralsPatientLookUpSchemaType => {
  return {
    name: '',
    patientStatuses: [],
    age: '',
    gender: '',
    mrn: '',
    dateOfBirth: null,
    telephone: '',
    email: '',
    stateOfResidenceCode: '',
    city: '',
    postalCode: '',
    primaryInsurancePolicyIds: [],
    secondaryInsurancePolicyIds: [],
    servicesOfferedList: [],
    fromReferralDate: null,
    toReferralDate: null,
    appointmentId: '',
    serviceStatuses: [],
    initiatedByRoles: [],
    providerNames: [],
    practiceId: [],
    organizationId: [],
    contactStatusList: [],
    resourceStatusList: [],
    nextVisit: '',
    visitHx: '',
  }
}

const transformOutPatientRow = ({
  id,
  patientName: { firstName = '', lastName = '', middleName = '' },
  dateOfBirth,
  mrn = '',
  resourceStatus = '',
  gender = '',
  state = '',
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
  patientMrn: mrn,
  gender,
  dob: dateOfBirth ? formatDateOfBirth(dateOfBirth) : '',
  patientStatus: resourceStatus,
  state,
})

const convertDateField = (field: DateValue | null | undefined) => {
  return field ? convertToCalendarDate(field) : null
}

const hasFieldErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors)?.length > 0

const isPrescriber = (staff?: StaffResource) =>
  staff?.staffRoleCode === STAFF_ROLE_CODE_PRESCRIBER

const isContactStatusError = (status: string) =>
  status === ContactMadeStatuses.Error

const getPrimaryInsuranceName = (
  insurances: Insurance[] | undefined,
): string | null => {
  if (!insurances || insurances?.length === 0) {
    return null
  }
  const primaryInsurance = insurances.find(
    (insurance) => insurance.insurancePolicyPriority === 'Primary',
  )
  return primaryInsurance?.policyName || null
}

const getSecondaryInsuranceName = (
  insurances: Insurance[] | undefined,
): string | null => {
  if (!insurances || insurances?.length === 0) {
    return null
  }
  const secondaryInsurance = insurances.find(
    (insurance) => insurance.insurancePolicyPriority === 'Secondary',
  )
  return secondaryInsurance?.policyName || null
}

export {
  isPrescriber,
  isContactStatusError,
  getInitialValues,
  convertDateField,
  hasFieldErrors,
  transformOutPatientRow,
  getPrimaryInsuranceName,
  getSecondaryInsuranceName,
}
