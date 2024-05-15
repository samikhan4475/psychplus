import type { Address, PatientAddress } from '@psychplus-v2/types'

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

const getClinicAddressLabel = (addresses?: Address[]) => {
  const address = addresses?.[0]

  if (!address) {
    return ''
  }

  const stateAbbreviation = getStateAbbreviation(address.state)

  return `${address.street1} ${address.city}, ${stateAbbreviation} ${address.postalCode}`
}

const STATE_ABBREVIATIONS: Record<string, string> = {
  arizona: 'AZ',
  alabama: 'AL',
  alaska: 'AK',
  arkansas: 'AR',
  california: 'CA',
  colorado: 'CO',
  connecticut: 'CT',
  'district of columbia': 'DC',
  delaware: 'DE',
  florida: 'FL',
  georgia: 'GA',
  hawaii: 'HI',
  idaho: 'ID',
  illinois: 'IL',
  indiana: 'IN',
  iowa: 'IA',
  kansas: 'KS',
  kentucky: 'KY',
  louisiana: 'LA',
  maine: 'ME',
  maryland: 'MD',
  massachusetts: 'MA',
  michigan: 'MI',
  minnesota: 'MN',
  mississippi: 'MS',
  missouri: 'MO',
  montana: 'MT',
  nebraska: 'NE',
  nevada: 'NV',
  'new hampshire': 'NH',
  'new jersey': 'NJ',
  'new mexico': 'NM',
  'new york': 'NY',
  'north carolina': 'NC',
  'north dakota': 'ND',
  ohio: 'OH',
  oklahoma: 'OK',
  oregon: 'OR',
  pennsylvania: 'PA',
  'rhode island': 'RI',
  'south carolina': 'SC',
  'south dakota': 'SD',
  tennessee: 'TN',
  texas: 'TX',
  utah: 'UT',
  vermont: 'VT',
  virginia: 'VA',
  washington: 'WA',
  'west virginia': 'WV',
  wisconsin: 'WI',
  wyoming: 'WY',
  'american samoa': 'AS',
  guam: 'GU',
  'northern mariana islands': 'MP',
  'puerto rico': 'PR',
  'us virgin islands': 'VI',
  'us minor outlying islands': 'UM',
}

export { getStateAbbreviation, areAddressesEqual, getClinicAddressLabel }
