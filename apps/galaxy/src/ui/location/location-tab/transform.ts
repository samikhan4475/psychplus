import { SelectOptionType } from '@/types'
import { LocationFormSchemaType } from './filter-form'
import { LocationSchemaType } from './location-dialog/location-form'
import { LocationFilter, LocationFormBody } from './types'
import { sanitizeFormData } from './utils'

const transformOutLocation = ({
  address: {
    address1: street1,
    address2: street2,
    zip: postalCode,
    postalPlus4Code,
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
      postalPlus4Code,
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
  isGoogleLinkStatus,
  ...data
}: LocationFormSchemaType): LocationFilter =>
  sanitizeFormData({
    locationType: transformOutOption(locationType),
    recordStatuses:
      transformOutOption(recordStatuses) && recordStatuses
        ? [recordStatuses]
        : undefined,
    stateCode: transformOutOption(stateCode),
    isGoogleLinkStatus: transformOutOption(isGoogleLinkStatus)
      ? transformOutOption(isGoogleLinkStatus) === 'yes'
      : undefined,
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

const transformOutOption = (value = '') =>
  value === 'NotSet' ? undefined : value

export { transformOutLocation, transformInOptions, transformOutFilters }
