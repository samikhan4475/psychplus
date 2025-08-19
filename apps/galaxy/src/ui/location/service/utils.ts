import {
  Cosigner,
  Encounter,
  Location,
  SelectOptionType,
  Service,
  SharedCode,
  VisitType,
} from '@/types'
import { ServiceSchemaType } from './add-service-dialog'
import { ServiceFiltersSchemaType } from './filter-form/schema'
import {
  BillingUsageType,
  CosignerType,
  LocationType,
  PrimayProviderType,
  ServiceClaimAddress,
  Services,
} from './types'

const getAttributeValue = (code: SharedCode, name: string) =>
  code?.attributes?.find((attr) => attr?.name === name)?.value

const getYesNoValue = (value?: boolean) => {
  if (value === undefined) return ''
  return value ? 'yes' : 'no'
}

const getServiceClaimAddress = (
  location?: Location,
  service?: Service,
): Partial<ServiceClaimAddress> => ({
  street1:
    location?.address?.street1 ?? service?.locationAddress?.street1 ?? '',
  street2:
    location?.address?.street2 ?? service?.locationAddress?.street2 ?? '',
  city: location?.address?.city ?? service?.locationAddress?.city ?? '',
  state: location?.address?.state ?? service?.locationAddress?.state ?? '',
  postalCode:
    location?.address?.postalCode ?? service?.locationAddress?.postalCode ?? '',
  postalPlus4Code:
    location?.address?.postalPlus4Code ??
    service?.locationAddress?.postalPlus4Code ??
    '',
  cityId: location?.cityId ?? service?.locationCityId ?? '',
  stateId: location?.stateId ?? service?.locationStateId ?? '',
})

const isMaxBookingFrequencyDisabled = (serviceOffered?: string) => {
  if (!serviceOffered) {
    return true
  }
  return [
    Services.Psychiatry,
    Services.Therapy,
    Services.GroupTherapy,
    Services.CouplesFamilyTherapy,
    Services.NeuropsychologicalEvaluation

  ].includes(serviceOffered as Services)
}

const getMaxBookingFrequency = (service: string, code: SharedCode) => {
  const maxBookingFrequency =
    getAttributeValue(code, 'MaxBookingFrequency') ?? ''
  const { CouplesFamilyTherapy, GroupTherapy, Psychiatry, Therapy,NeuropsychologicalEvaluation } = Services
  if (
    [CouplesFamilyTherapy, GroupTherapy, Psychiatry, Therapy,NeuropsychologicalEvaluation].includes(
      service as Services,
    )
  ) {
    return maxBookingFrequency
  }
  return ''
}

const generateMaxBookingFrequencyOptions = (
  value?: string,
): SelectOptionType[] =>
  [...Array(value ? Number(value) : 999)].map((_, index) => {
    const value = String(index + 1)
    return { label: value, value }
  })

const getCosigner = (
  cosigners: Cosigner[],
  cosignerId?: string,
  cosignerType?: string,
) => {
  if (
    !cosigners?.length ||
    !cosignerId ||
    !cosignerType ||
    cosignerType !== CosignerType.Location
  ) {
    return undefined
  }

  return cosigners.find(({ id }) => String(id) === cosignerId)
}

const getCosignerId = (cosignerId?: number, cosignerType?: string) =>
  cosignerId && cosignerType && cosignerType !== 'None' ? cosignerId : undefined

const getVisitTypesByIds = (visitTypes: Encounter[], visitIds: string[]) =>
  (visitTypes?.reduce((result, visit) => {
    if (visitIds.includes(constructVisitId(visit))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, metadata, encounterToServices, ...item } = visit
      result.push({
        ...item,
        encounterToServices: encounterToServices?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, encounterId, ...rest }) => rest,
        ),
      } as Encounter)
    }
    return result
  }, [] as Encounter[]) as unknown as VisitType[]) ?? []

const getPrimaryProviderTypeOptions = (
  providerTypes: SelectOptionType[],
): SelectOptionType[] =>
  providerTypes?.filter((item) =>
    [
      PrimayProviderType.InternalMedicine,
      PrimayProviderType.PMNR,
      PrimayProviderType.Psychiatrist,
      PrimayProviderType.FamilyMedicine,
    ].includes(item?.value as PrimayProviderType),
  )
const getLocationTypeOptions = (
  locationTypes: SelectOptionType[],
): SelectOptionType[] =>
  locationTypes?.filter((item) =>
    [LocationType.Clinic, LocationType.Facility].includes(
      item?.value as LocationType,
    ),
  )
const getInitialValues = (
  location?: Location,
  service?: Service,
): ServiceSchemaType => ({
  id: service?.id ?? '',
  locationId: location?.id ?? service?.locationId ?? '',
  locationName: location?.name ?? service?.locationName ?? '',
  cityId: location?.cityId ?? service?.cityId ?? '',
  stateId: location?.stateId ?? service?.stateId ?? '',
  locationType: location?.locationType ?? service?.locationType ?? '',
  coSignerId: service ? String(service?.coSignerId) : '',
  serviceOffered: service?.serviceOffered ?? '',
  taxonomy: service?.taxonomy ?? '',
  primaryProviderType: service?.primaryProviderType ?? '',
  isServiceTimeDependent: getYesNoValue(service?.isServiceTimeDependent) ?? '',
  servicePlace: service?.servicePlace ?? '',
  maxBookingFrequencyInSlot: service
    ? String(service?.maxBookingFrequencyInSlot)
    : '',
  isPolicyRequired: getYesNoValue(
    service ? service?.isPolicyRequired : location?.locationType !== 'Facility',
  ),
  isReminderForNotes: getYesNoValue(service?.isReminderForNotes) || 'yes',
  isReminderForVisit: getYesNoValue(
    service
      ? service?.isReminderForVisit
      : location?.locationType !== 'Facility',
  ),
  isPatientSeenEveryDay: getYesNoValue(service?.isPatientSeenEveryDay) ?? '',
  isAutomaticBilling: getYesNoValue(service?.isAutomaticBilling) ?? '',
  billingUsageType:
    service?.billingUsageType ??
    (location?.locationType === 'Facility'
      ? BillingUsageType.CodingOnly
      : BillingUsageType.EHRCoding),
  isRequiresMedicalVisit:
    service?.isRequiresMedicalVisit !== undefined
      ? service?.isRequiresMedicalVisit
      : false,
  address1: location?.address?.street1 ?? service?.address?.street1 ?? '',
  address2: location?.address?.street2 ?? service?.address?.street2 ?? '',
  city: location?.address?.city ?? service?.address?.city ?? '',
  state: location?.address?.state ?? service?.address?.state ?? '',
  zip: location?.address?.postalCode ?? service?.address?.postalCode ?? '',
  postalPlus4Code:
    location?.address?.postalPlus4Code ??
    service?.address?.postalPlus4Code ??
    '',
  serviceVisitTypes: service
    ? service?.serviceVisitTypes?.map((v) => constructVisitId(v)) ?? []
    : [],
  coSignerType: service?.coSignerType ?? '',
  isClaimAddress: service ? service?.isClaimAddress : true,
  cosigner: service?.cosigner ? String(service?.cosigner?.id) : '',
  isPrimaryProviderRequired: '',
})

const getInitialFilterValues = (): ServiceFiltersSchemaType => ({
  address: '',
  cosignerId: '',
  coSignerType: '',
  locationName: '',
  locationType: '',
  maxBookingFrequency: '',
  providerType: '',
  recordStatus: '',
  serviceOffered: '',
  servicePlace: '',
  taxonomy: '',
  visitTypeName: '',
})

const getPOSLabel = (codes: SharedCode[], value: string): string | null => {
  if (!value) return null
  const valuesArray = value.split(',')
  const matchedLabels: string[] = []
  codes?.forEach((code) => {
    const { value: codeValue } = code
    const submissionCode = getAttributeValue(code, 'SubmissionCode') ?? ''
    const label = `${submissionCode?.padStart(2, '0')} - ${code.display}`
    if (
      valuesArray.includes(codeValue) ||
      valuesArray.includes(submissionCode)
    ) {
      matchedLabels.push(label)
    }
  })
  return matchedLabels?.length ? matchedLabels.join(' | ') : null
}

const getLocationInfo = (location?: Location, service?: Service) =>
  [
    location?.name ?? service?.locationName ?? 'N/A',
    location?.locationType ?? service?.locationType ?? 'N/A',
    location?.address?.city ?? service?.locationAddress?.city ?? 'N/A',
    location?.address?.state ?? service?.locationAddress?.state ?? 'N/A',
  ].join(' | ')

const constructVisitId = (visit: Encounter | VisitType) =>
  `${visit.typeOfVisit},${visit?.visitSequence},${visit?.visitMedium}`

const getFilteredOptionValue = (value?: string): string | undefined =>
  value && value !== 'NotSet' ? value : undefined

export {
  getAttributeValue,
  getCosigner,
  getInitialValues,
  getVisitTypesByIds,
  getInitialFilterValues,
  isMaxBookingFrequencyDisabled,
  getMaxBookingFrequency,
  getPrimaryProviderTypeOptions,
  getPOSLabel,
  getLocationInfo,
  getServiceClaimAddress,
  getYesNoValue,
  constructVisitId,
  generateMaxBookingFrequencyOptions,
  getFilteredOptionValue,
  getLocationTypeOptions,
  getCosignerId,
}
