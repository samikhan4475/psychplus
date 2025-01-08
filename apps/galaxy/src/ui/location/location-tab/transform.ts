import { SelectOptionType } from '@/types'
import { sanitizeFormData } from '@/utils'
import { LocationFormSchemaType } from './filter-form'
import { LocationSchemaType } from './location-dialog/location-form'
import { LocationFilter, LocationFormBody } from './types'

const transformOutLocation = ({
  address: {
    address1: street1,
    address2: street2,
    zip: postalCode,
    ...address
  },
  isTestLocation,
  phone,
  fax,
  ...data
}: LocationSchemaType): LocationFormBody =>
  sanitizeFormData({
    address: {
      street1,
      street2,
      postalCode,
      ...address,
    },
    isTestLocation: isTestLocation === 'yes',
    phone: phone?.number ? phone : null,
    fax: fax?.number ? fax : null,
    ...data,
  })

const transformOutFilters = ({
  stateCode,
  recordStatuses,
  locationType,
  ...data
}: LocationFormSchemaType): LocationFilter =>
  sanitizeFormData({
    locationType: locationType !== 'NotSet' ? locationType : undefined,
    recordStatuses:
      recordStatuses && recordStatuses !== 'NotSet'
        ? [recordStatuses]
        : undefined,
    stateCode: stateCode !== 'NotSet' ? stateCode : undefined,
    ...data,
  })

const transformInOptions = (
  options: SelectOptionType[] = [],
): SelectOptionType[] => [
  {
    value: 'NotSet',
    label: 'Select',
  },
  ...options,
]

export { transformOutLocation, transformInOptions, transformOutFilters }
