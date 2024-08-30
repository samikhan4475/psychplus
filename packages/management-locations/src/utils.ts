import type { Location } from './types'

const data: Location[] = [...Array(100)].map(() => ({
  id: '213',
  locationType: 'Facility',
  locationName: 'Willowbrook',
  npi: '1234567890',
  taxonomy: '207Q00000X',
  p_address_1: 'St 10,Willow Brook ',
  p_address_2: 'Psychiatry',
  city: 'Houston',
  state: 'Taxes',
  zip: '77002',
  fax: 'English',
  status: 'Active',
  phone: '1234567890',
}))

const handleMockRequest = (): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

const getLocations = (): Promise<Location[]> => handleMockRequest()

export { getLocations }
