import {
  ClinicAddress,
  Encounter,
  SelectOptionType,
  SharedCode,
  StaffResource,
} from '@/types'
import { getPatientFullName, sanitizeFormData } from '@/utils'
import { ServiceSchemaType } from './add-service-dialog'
import { ServicePayload } from './types'
import { getCosigner, getVisitTypesByIds } from './utils'

const transformInCosigers = (data: StaffResource[]) => {
  return data.map((item) => {
    const label = getPatientFullName(item?.legalName)
    return {
      label,
      value: String(item?.id),
    }
  })
}

const transformInServices = (
  codes: SharedCode[],
  locationType: string,
): SelectOptionType[] =>
  codes
    ?.filter((code) =>
      code?.attributes
        ?.find((attr) => attr.name === 'LocationType')
        ?.value?.includes(locationType),
    )
    .map(({ value, display: label }) => ({ label, value }))

const transformOutService = (
  cosigners: StaffResource[],
  visitTypes: Encounter[],
  locationAddress: ClinicAddress,
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
    isClaimAddress,
    zip: zipCode,
    address1,
    address2,
    state,
    city,
    isServiceTimeDependent,
    ...data
  }: ServiceSchemaType,
): ServicePayload => {
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
    coSignerId,
    cosigner: getCosigner(cosigners, coSignerId, coSignerType),
    serviceVisitTypes: getVisitTypesByIds(visitTypes, serviceVisitTypes),
    isClaimAddress,
    address1: isClaimAddress ? locationAddress.street1 : address1,
    address2: isClaimAddress ? locationAddress.street2 : address2,
    city: isClaimAddress ? locationAddress.city : city,
    state: isClaimAddress ? locationAddress.state : state,
    zipCode: isClaimAddress ? locationAddress.postalCode : zipCode,
  })
}

export { transformInCosigers, transformOutService, transformInServices }
