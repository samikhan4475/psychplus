'use server'

import * as api from '@psychplus-v2/api'

export interface ZipcodeAPIResponse {
  country: string
  places: Place[]
}

export interface Place {
  longitude: string
  state: string
  latitude: string
}

const getZipcodeInfo = async (zipCode: string) =>
  api.GET<ZipcodeAPIResponse>(`https://api.zippopotam.us/us/${zipCode}`, {
    next: {
      revalidate: 3600,
    },
  })

export { getZipcodeInfo }
