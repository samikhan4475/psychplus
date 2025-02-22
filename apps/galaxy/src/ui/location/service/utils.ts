import { Encounter, Location, SharedCode, StaffResource } from '@/types'
import { ServiceSchemaType } from './add-service-dialog'
import { ServiceFiltersSchemaType } from './filter-form/schema'
import { CosignerType } from './types'

const getAttributeValue = (code: SharedCode, name: string) =>
  code?.attributes?.find((attr) => attr?.name === name)?.value

const getCosigner = (
  cosigners: StaffResource[],
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

const getVisitTypesByIds = (visitTypes: Encounter[], visitIds: number[]) =>
  visitTypes?.reduce((result, visit) => {
    if (visitIds.includes(visit.id)) {
      const { id, metadata, encounterToServices, ...item } = visit
      result.push({
        ...item,
        encounterToServices: encounterToServices?.map(
          ({ id, encounterId, ...rest }) => rest,
        ),
      } as Encounter)
    }
    return result
  }, [] as Encounter[]) ?? []

const getInitialValues = (location: Location): ServiceSchemaType => ({
  locationId: location?.id,
  locationName: location?.name,
  cityId: location.cityId,
  stateId: location.stateId,
  locationType: location.locationType,
  coSignerId: '',
  serviceOffered: '',
  taxonomy: '',
  primaryProviderType: '',
  isServiceTimeDependent: '',
  servicePlace: '',
  maxBookingFrequencyInSlot: '',
  isPolicyRequired: location?.locationType === 'Facility' ? 'no' : 'yes',
  isReminderForNotes: 'yes',
  isReminderForVisit: location?.locationType === 'Facility' ? 'no' : 'yes',
  isPatientSeenEveryDay: '',
  isAutomaticBilling: '',
  billingUsageType:
    location?.locationType === 'Facility' ? 'CodingOnly' : 'EHRCoding',
  isRequiresMedicalVisit: false,
  address1: location?.address?.street1 ?? '',
  address2: location?.address?.street2 ?? '',
  city: location?.address?.city ?? '',
  state: location?.address?.state ?? '',
  zip: location?.address?.postalCode ?? '',
  serviceVisitTypes: [],
  coSignerType: '',
  isClaimAddress: true,
  cosigner: '',
  isPrimaryProviderRequired: '',
})

const getInitialFilterValues = (): ServiceFiltersSchemaType => ({
  address: '',
  coSigner: '',
  coSignerType: '',
  id: '',
  locationName: '',
  locationType: '',
  maxBookingFrequency: '',
  pos: '',
  primaryProvider: '',
  recordStatuses: '',
  service: '',
  taxonomy: '',
  visitType: '',
})

export {
  getAttributeValue,
  getCosigner,
  getInitialValues,
  getVisitTypesByIds,
  getInitialFilterValues,
}
