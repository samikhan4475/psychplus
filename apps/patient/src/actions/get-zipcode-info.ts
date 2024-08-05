'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'

interface GeocodingAPIResponse {
  results: Result[]
  status: string
}

interface Result {
  address_components: AddressComponent[]
  formatted_address: string
  geometry: Geometry
  place_id: string
  plus_code: PlusCode
  types: string[]
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface Geometry {
  location: Location
  location_type: string
  viewport: Viewport
}

interface Location {
  lat: number
  lng: number
}

interface Viewport {
  northeast: Location
  southwest: Location
}

interface PlusCode {
  compound_code: string
  global_code: string
}

const getZipcodeInfo = async (
  zipCode: string,
): Promise<ActionResult<string>> => {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
  url.searchParams.append('address', `${zipCode}`)
  url.searchParams.append('key', `${GOOGLE_MAPS_API_KEY}`)

  const result = await api.GET<GeocodingAPIResponse>(url.toString())

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  if (result.data.results.length === 0) {
    return {
      state: 'error',
      error: 'No results found',
    }
  }

  let state = ''
  for (const component of result.data.results[0].address_components) {
    if (component.types.includes('administrative_area_level_1')) {
      state = component.long_name
      break
    }
  }

  return {
    state: 'success',
    data: state,
  }
}

export { getZipcodeInfo }
