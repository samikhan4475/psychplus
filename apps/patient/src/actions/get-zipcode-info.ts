'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import multiStateZipcodes from './multi_state_zip_codes.json'


interface MultiStateZipCodes {
  [key: string]: AddressComponent[]
}

const MULTI_STATE_ZIP_CODES_TYPED: MultiStateZipCodes = multiStateZipcodes

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
const getMultiStateZipCode = (zipCode: string): AddressComponent[] | null => {
  return MULTI_STATE_ZIP_CODES_TYPED[zipCode] || null
}
const getZipcodeInfo = async (
  zipCode: string,
): Promise<ActionResult<AddressComponent[]>> => {
  const multiStateData = getMultiStateZipCode(zipCode)
  if (multiStateData) {
    return {
      state: 'success',
      data: multiStateData,
    }
  }
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
  url.searchParams.append('address', zipCode)
  url.searchParams.append('key', GOOGLE_MAPS_API_KEY)

  try {
    const result = await api.GET<GeocodingAPIResponse>(url.toString())

    if (result.state === 'error') {
      return { state: 'error', error: result.error }
    }

    if (!result.data.results.length) {
      return { state: 'error', error: 'No results found' }
    }

    const stateComponents = result.data.results[0].address_components.filter(
      (component) => component.types.includes('administrative_area_level_1'),
    )

    if (stateComponents.length === 0) {
      return { state: 'error', error: 'No state information found' }
    }

    return {
      state: 'success',
      data: stateComponents,
    }
  } catch (error) {
    return { state: 'error', error: 'Failed to fetch ZIP code info' }
  }
}

export { getZipcodeInfo }
