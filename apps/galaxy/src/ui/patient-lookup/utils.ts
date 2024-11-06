import { DateValue } from 'react-aria-components'
import { FieldErrors } from 'react-hook-form'
import { convertToCalendarDate } from '@/utils'
import { PatientLookUpSchemaType } from './patient-filter-form'

const getInitialValues = (): PatientLookUpSchemaType => {
  return {
    name: '',
    mrn: '',
    age: '',
    dateOfBirth: null,
    firstName: '',
    gender: '',
    lastName: '',
    city: '',
    hasGuardian: '',
    postalCode: '',
    telephone: '',
    consentVerificationStatus: '',
    creditCardVerificationStatus: '',
    patientCreatedFrom: null,
    patientCreatedTo: null,
    email: '',
    ssn: '',
    patientStatuses: [],
    verificationStatuses: [],
    practices: [],
    insuranceVerificationStatuses: [],
    contactMadeStatuses: '',
    insurancePolicyIds: [],
    visitHistoryPastDays: '',
    futureVisitsByDays: '',
    pastVisitStatus: '',
    nextVisitStatus: '',
    organizations: [],
  }
}

const convertDateField = (field: DateValue | null | undefined) => {
  return field ? convertToCalendarDate(field) : null
}

const hasFieldErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors)?.length > 0

export { getInitialValues, convertDateField, hasFieldErrors }
