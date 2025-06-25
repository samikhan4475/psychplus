import { DateValue } from 'react-aria-components'
import { FieldErrors } from 'react-hook-form'
import { convertToCalendarDate } from '@/utils'
import { ExternalReferralSchemaType } from './external-referral-filter-form'

const getInitialValues = (): ExternalReferralSchemaType => {
  return {
    name: '',
    patientExternalMrn: '',
    age: '',
    patientDateOfBirth: null,
    patientPartialFirstName: '',
    patientGender: 'Male',
    patientPartialLastName: '',
    city: '',
    hasGuardian: '',
    postalCode: '',
    telephone: '',
    consentVerificationStatuses: [],
    creditCardVerificationStatuses: [],
    patientCreatedFrom: null,
    patientCreatedTo: null,
    email: '',
    ssn: '',
    patientStatuses: [],
    verificationStatuses: [],
    insuranceVerificationStatuses: [],
    contactMadeStatusList: '',
    insurancePolicyIds: [],
    pastVisitStatus: '',
    nextVisitStatus: '',
    stateCode: '',
    services: [],
    isLinked: '',
    organizationName: '',
  }
}

const convertDateField = (field: DateValue | null | undefined) => {
  return field ? convertToCalendarDate(field) : null
}

const hasFieldErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors)?.length > 0

const validateDate = (
  date: DateValue,
  referenceDate: DateValue | undefined | null,
) => {
  return referenceDate ? date?.compare(referenceDate) : 0
}

export { getInitialValues, convertDateField, hasFieldErrors, validateDate }
