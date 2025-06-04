import { UsersSearchParam } from './types'

const defaultFilters = (formValues?: UsersSearchParam) => ({
  firstName: formValues?.firstName ?? '',
  lastName: formValues?.lastName ?? '',
  age: formValues?.age ?? '',
  gender: formValues?.gender ?? '',
  mrn: formValues?.mrn ?? '',
  dateOfBirth: formValues?.dateOfBirth ?? undefined,
  city: formValues?.city ?? '',
  postalCode: formValues?.postalCode ?? '',
  stateId: '',
  hasGuardian: formValues?.hasGuardian ?? '',
  telephone: formValues?.telephone ?? '',
  email: formValues?.email ?? '',
  ssn: formValues?.ssn ?? '',
  patientStatuses: formValues?.patientStatuses ?? [],
  verificationStatuses: formValues?.verificationStatuses ?? [],
  insuranceVerificationStatuses:
    formValues?.insuranceVerificationStatuses ?? [],
  consentVerificationStatuses: formValues?.consentVerificationStatuses ?? [],
  creditCardVerificationStatuses:
    formValues?.creditCardVerificationStatuses ?? [],
  patientCreatedFrom: formValues?.patientCreatedFrom ?? undefined,
  patientCreatedTo: formValues?.patientCreatedTo ?? undefined,
  futureVisitsByDays: formValues?.futureVisitsByDays ?? '',
  nextVisitStatus: formValues?.nextVisitStatus ?? '',
  contactMadeStatuses: [],
  pastVisitStatus: formValues?.pastVisitStatus ?? '',
  visitHistoryPastDays: formValues?.visitHistoryPastDays ?? '',
  insurancePolicyIds: formValues?.insurancePolicyIds ?? [],
  organizations: '',
  practices: formValues?.practices ?? [],
})

export { defaultFilters }
