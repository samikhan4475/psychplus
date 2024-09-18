import { handleRequest } from '../api'
import multiStateZipJson from './multi_state_zip_codes.json'
import { AddressComponent, GeocodingAPIResponse } from './types'

const MULTI_STATE_ZIP_CODES: { [key: string]: AddressComponent[] } =
  multiStateZipJson

export const getZipcodeInfo = async (zipCode: string, mapKey: string) => {
  if (MULTI_STATE_ZIP_CODES[zipCode]) {
    return {
      state: 'success',
      data: MULTI_STATE_ZIP_CODES[zipCode],
    }
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
  url.searchParams.append('address', zipCode)
  url.searchParams.append('key', mapKey)

  const response = await handleRequest<GeocodingAPIResponse>(
    fetch(url.toString()),
  )

  if (!response.results.length) {
    return {
      state: 'error',
      data: [],
    }
  }

  const state: AddressComponent[] = []

  for (const component of response.results[0].address_components) {
    if (component.types.includes('administrative_area_level_1')) {
      if (!state.includes(component)) {
        state.push(component)
      }
    }
  }

  return {
    state: 'success',
    data: state,
  }
}
