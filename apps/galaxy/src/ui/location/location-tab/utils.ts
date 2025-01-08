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
  }
}

const getServiceLabel = (options: SelectOptionType[], value: string) =>
  options?.find((option) => option.value === value)?.label

export { getServiceLabel, getInitialValues, getInitialLocationValues }
