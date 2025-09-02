import { Location, SelectOptionType } from '@/types'
import { LocationType } from '../constant'
import { LocationFormSchemaType } from './filter-form'
import { LocationSchemaType } from './location-dialog'
import { LocationFilter } from './types'

const getInitialValues = (): LocationFormSchemaType => {
  return {
    locationNameGenerated: '',
    locationName: '',
    locationType: '',
    npi: '',
    zip: '',
    recordStatuses: '',
    stateCode: '',
    Phone: '',
    isGoogleLinkStatus: '',
  }
}
const getInitialLocationValues = (location?: Location): LocationSchemaType => {
  return {
    address: {
      type: location?.address?.type ?? 'Home',
      address1: location?.address?.street1 ?? '',
      city: location?.address?.city ?? '',
      state: location?.address?.state ?? '',
      address2: location?.address?.street2 ?? '',
      zip: location?.address?.postalCode ?? '',
      postalPlus4Code: location?.address?.postalPlus4Code ?? '',
    },
    isTestLocation: location?.isTestLocation ? 'yes' : 'no',
    locationType: location?.locationType ?? 'Clinic',
    name: location?.name ?? '',
    npi: location?.npi ?? '',
    phone: {
      number: sanitizePhoneNumber(location?.phone?.number ?? ''),
      type: location?.phone?.type ?? 'Home',
    },
    recordStatus: location?.recordStatus ?? '',
    fax: {
      number: location?.fax?.number ?? '',
      type: location?.fax?.type ?? 'Business',
    },
    locationNameGenerated: location?.locationNameGenerated ?? '',
    id: location?.id ?? '',
    locationGoogleLink: location?.locationGoogleLink ?? '',
  }
}

const getServiceLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

function sanitizeFormData<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value?.length !== 0 &&
        value !== 'undefined',
    ),
  ) as T
}

const withDefaultLocationTypes = (
  formValues: Partial<LocationFilter> | undefined,
) => ({
  ...formValues,
  ...(formValues?.locationType
    ? {}
    : { locationTypes: [LocationType.Clinic, LocationType.Facility] }),
})
function sanitizePhoneNumber(input: string): string {
  return input.replace(/[^\d]/g, '')
}
export {
  getServiceLabel,
  getInitialValues,
  getInitialLocationValues,
  sanitizeFormData,
  withDefaultLocationTypes,
}
