import { Location, SelectOptionType } from '@/types'
import { LocationFormSchemaType } from './filter-form'
import { LocationSchemaType } from './location-dialog'

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
      zipLast4: location?.address?.zipLast4 ?? '',
    },
    isTestLocation: location?.isTestLocation ? 'yes' : 'no',
    locationType: location?.locationType ?? 'Clinic',
    name: location?.name ?? '',
    npi: location?.npi ?? '',
    phone: {
      number: location?.phone?.number ?? '',
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

export {
  getServiceLabel,
  getInitialValues,
  getInitialLocationValues,
  sanitizeFormData,
}
