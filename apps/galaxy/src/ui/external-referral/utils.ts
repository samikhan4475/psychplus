import { DateValue } from 'react-aria-components'
import { FieldErrors } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GET_EXTERNAL_REFERRAL_ATTACHMENT } from '@/api/endpoints'
import { convertToCalendarDate } from '@/utils'
import { downloadFile } from '@/utils/download'
import { ExternalReferralSchemaType } from './external-referral-filter-form'

const getInitialValues = (): ExternalReferralSchemaType => {
  return {
    name: '',
    patientExternalMrn: '',
    age: '',
    patientDateOfBirth: null,
    patientPartialFirstName: '',
    patientGender: '',
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

export const handleExternalReferralAttachmentExport = async (
  externalReferralId: number,
  attachmentId: string,
) => {
  try {
    const endpoint = GET_EXTERNAL_REFERRAL_ATTACHMENT(
      externalReferralId.toString(),
      attachmentId,
    )
    await downloadFile(endpoint, '', 'POST', {})
  } catch (error) {
    toast.error(`Failed to download`)
  }
}

export { getInitialValues, convertDateField, hasFieldErrors, validateDate }
