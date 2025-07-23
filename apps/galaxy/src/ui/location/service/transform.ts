import { getCodeAttributeBoolean } from '@/hooks'
import { Cosigner, Encounter, SelectOptionType, SharedCode } from '@/types'
import { getPatientFullName, sanitizeFormData } from '@/utils'
import { ServiceSchemaType } from './add-service-dialog'
import { ServiceFiltersSchemaType } from './filter-form'
import { ServiceFiltersPayload, ServicePaylod } from './types'
import {
  getAttributeValue,
  getCosigner,
  getCosignerId,
  getFilteredOptionValue,
  getVisitTypesByIds,
} from './utils'

const transformInCosigers = (data: Cosigner[]) => {
  return data.map((item) => {
    const label = getPatientFullName(item?.legalName)
    return {
      label,
      value: String(item?.id),
    }
  })
}
const transformInPOSOptions = (codes: SharedCode[]): SelectOptionType[] => {
  return codes?.map((code) => {
    const submissionCode = String(getAttributeValue(code, 'SubmissionCode'))
    const label = `${submissionCode?.padStart(2, '0')} - ${code.display}`
    return { label, value: submissionCode }
  })
}

const transformInServices = (
  codes: SharedCode[],
  locationType: string,
): SelectOptionType[] =>
  codes?.reduce((acc: SelectOptionType[], code) => {
    const locationTypes = getAttributeValue(code, 'LocationType')
    const isActive = getCodeAttributeBoolean(code, 'IsActive')
    if (locationTypes?.includes(locationType) && isActive) {
      acc.push({ label: code.display, value: code.value })
    }
    return acc
  }, [])

const transformOutService = (
  cosigners: Cosigner[],
  visitTypes: Encounter[],
  {
    isPolicyRequired,
    isReminderForNotes,
    isReminderForVisit,
    isPatientSeenEveryDay,
    isAutomaticBilling,
    maxBookingFrequencyInSlot,
    cosigner: coSignerId,
    coSignerType,
    serviceVisitTypes,
    zip: postalCode,
    postalPlus4Code,
    address1: street1,
    address2: street2,
    state,
    city,
    isServiceTimeDependent,
    ...data
  }: ServiceSchemaType,
): Partial<ServicePaylod> => {
  return sanitizeFormData({
    ...data,
    isPolicyRequired: isPolicyRequired === 'yes',
    isReminderForNotes: isReminderForNotes === 'yes',
    isReminderForVisit: isReminderForVisit === 'yes',
    isPatientSeenEveryDay: isPatientSeenEveryDay === 'yes',
    isAutomaticBilling: isAutomaticBilling === 'yes',
    maxBookingFrequencyInSlot: Number(maxBookingFrequencyInSlot),
    isServiceTimeDependent: isServiceTimeDependent === 'yes',
    coSignerType,
    coSignerId: getCosignerId(Number(coSignerId), coSignerType),
    cosigner: getCosigner(cosigners, coSignerId, coSignerType),
    serviceVisitTypes: getVisitTypesByIds(visitTypes, serviceVisitTypes),
    address: {
      city,
      state,
      street1,
      street2,
      postalCode,
      postalPlus4Code,
    },
  })
}

const transformInOptions = (
  options: SelectOptionType[] = [],
): SelectOptionType[] => [
  {
    value: 'NotSet',
    label: 'Select',
  },
  ...options,
]

const transformOutServiceFilters = ({
  providerType,
  coSignerType,
  locationType,
  recordStatus,
  serviceOffered,
  servicePlace,
  taxonomy,
  visitTypeName,
  maxBookingFrequency,
  cosignerId,
  ...value
}: ServiceFiltersSchemaType): ServiceFiltersPayload => {
  const recordStatusValue = getFilteredOptionValue(recordStatus)
  return sanitizeFormData({
    providerType: getFilteredOptionValue(providerType),
    coSignerType: getFilteredOptionValue(coSignerType),
    locationType: getFilteredOptionValue(locationType),
    recordStatuses: recordStatusValue ? [recordStatusValue] : undefined,
    serviceOffered: getFilteredOptionValue(serviceOffered),
    servicePlace: getFilteredOptionValue(servicePlace),
    taxonomy: getFilteredOptionValue(taxonomy),
    visitTypeName: getFilteredOptionValue(visitTypeName),
    maxBookingFrequency: getFilteredOptionValue(maxBookingFrequency),
    cosignerId: getFilteredOptionValue(cosignerId),
    ...value,
  })
}

export {
  transformInCosigers,
  transformOutService,
  transformInServices,
  transformInOptions,
  transformInPOSOptions,
  transformOutServiceFilters,
}
