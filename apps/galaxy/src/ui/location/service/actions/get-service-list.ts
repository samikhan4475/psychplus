'use server'

import * as api from '@/api'
import { LocationService } from '../types'

const getServiceList = async (): Promise<
  api.ActionResult<LocationService[]>
> => {
  const response = await new Promise<api.NetworkResult<LocationService[]>>(
    (resolve) => {
      setTimeout(() => {
        resolve({ state: 'success', data } as api.NetworkResult<
          LocationService[]
        >)
      }, 2000)
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
    total: 20,
  }
}

const data: LocationService[] = [...Array(30)].map(() => ({
  id: 123456789,
  locationType: 'Facility',
  locationName: 'Willowbrook',
  service: 'Therapy/Counseling',
  pos: 27,
  taxonomy: 'Behavioral Health',
  primaryAddress1: 'St 10 Willow Brook',
  address2: '',
  city: 'Houston',
  state: 'Texas',
  zip: '77002',
  psychPlusPolicy: 'No Policy',
  reminder: 'Prov. Notes',
  ehrCode: 'EHR123',
  maxBookingFrequency: 5,
  cosignerType: 'Supervisor',
  primaryProvider: 'Dr. Smith',
  cosigner: 'dr Test1',
  status: 'Active',
  provNotes: '',
  ptVisits: '',
}))

export { getServiceList }
