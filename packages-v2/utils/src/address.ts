import type { Address, PatientAddress } from '@psychplus-v2/types'
import { truncateWithEllipsis } from './'

const areAddressesEqual = (
  addressA?: PatientAddress,
  addressB?: PatientAddress,
) => {
  if (!addressA && !addressB) {
    return true
  }

  if (!addressA || !addressB) {
    return false
  }

  return (
    addressA.street1 === addressB.street1 &&
    addressA.street2 === addressB.street2 &&
    addressA.city === addressB.city &&
    addressA.state === addressB.state &&
    addressA.postalCode === addressB.postalCode &&
    addressA.country === addressB.country
  )
}

const getStateAbbreviation = (name: string) => {
  const lowerCaseAbbreviationKey = name
    .trim()
    .replace(/[^\w ]/g, '')
    .toLowerCase()
  return STATE_ABBREVIATIONS[lowerCaseAbbreviationKey] ?? name
}

const getStateFullName = (abbreviation: string): string | undefined => {
  const formattedAbbreviation = abbreviation?.toLowerCase()
  return Object.keys(STATE_ABBREVIATIONS).find(
    (key) => STATE_ABBREVIATIONS[key].toLowerCase() === formattedAbbreviation,
  )
}

const getClinicAddressLabel = (addresses?: Address[]) => {
  const address = addresses?.[0]

  if (!address) {
    return ''
  }

  const stateAbbreviation = getStateAbbreviation(address.state ?? '')

  return `${address.street1} ${address.city}, ${stateAbbreviation} ${address.postalCode}`
}

const getBillingAddressLabel = (addresses?: Address[]) => {
  const address = addresses?.[0]

  if (!address) {
    return ''
  }

  const stateFullName = getStateFullName(address.state ?? '')

  return `${truncateWithEllipsis(address.street1)} ${
    address.city
  }, ${stateFullName} ${address.postalCode}`
}

const STATE_ABBREVIATIONS: Record<string, string> = {
  Arizona: 'AZ',
  Alabama: 'AL',
  Alaska: 'AK',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  'District Of Columbia': 'DC',
  Delaware: 'DE',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  'American Samoa': 'AS',
  Guam: 'GU',
  'Northern Mariana Islands': 'MP',
  'Puerto Rico': 'PR',
  'Us Virgin Islands': 'VI',
  'Us Minor Outlying Islands': 'UM',
}

const createAddress = (
  type: 'Primary' | 'Secondary',
  data: Record<string, any>,
): PatientAddress => {
  const prefix = type.toLowerCase()
  return {
    type: type === 'Primary' ? 'Home' : 'Mailing',
    street1: data[`${prefix}Street1`] ?? '',
    street2: data[`${prefix}Street2`] ?? '',
    city: data[`${prefix}City`] ?? '',
    state: data[`${prefix}State`] ?? '',
    postalCode: data[`${prefix}PostalCode`] ?? '',
    zipLast4: data[`${prefix}ZipLast4`] ?? '',
    country: data[`${prefix}Country`] ?? 'US',
  }
}
function buildClinicContactAddresses(
  locationAddress: Address,
  includeGeo: boolean,
): Address[] {
  const base: Omit<Address, 'geoCoordinates'> = {
    ...locationAddress,
    state: locationAddress.stateCode,
  }

  if (includeGeo && locationAddress.latitude && locationAddress.longitude) {
    return [
      {
        ...base,
        geoCoordinates: {
          latitude: locationAddress.latitude,
          longitude: locationAddress.longitude,
          altitude: 0,
        },
      },
    ]
  } else {
    return [base]
  }
}
export {
  getStateAbbreviation,
  getStateFullName,
  areAddressesEqual,
  getClinicAddressLabel,
  getBillingAddressLabel,
  createAddress,
  buildClinicContactAddresses
}
