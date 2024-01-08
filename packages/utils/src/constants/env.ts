import { AppEnv } from '../types'

const APP_CODE = process.env.APP_CODE ?? 'p+ui'
const APP_VERSION = process.env.APP_VERSION ?? '1.0.0'
const APP_ENV = (process.env.APP_ENV ?? 'development') as AppEnv
const APP_PATH = process.env.APP_PATH
const DISABLE_APP_PATH = process.env.DISABLE_APP_PATH === 'true'
const CLINICAL_URL = process.env.CLINICAL_URL
const PATIENT_URL = process.env.PATIENT_URL
const REVCYCLE_URL = process.env.REVCYCLE_URL
const PLATFORM_URL = process.env.PLATFORM_URL
const API_URL = process.env.API_URL
const LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT

const ALLOWED_ORIGINS = new Set(
  [CLINICAL_URL, PATIENT_URL, REVCYCLE_URL, PLATFORM_URL]
    .map((url) => {
      try {
        return new URL(url ?? '').origin
      } catch {
        return undefined
      }
    })
    .filter((url) => url !== undefined) as string[],
)
const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export {
  APP_VERSION,
  APP_CODE,
  APP_PATH,
  DISABLE_APP_PATH,
  APP_ENV,
  CLINICAL_URL,
  PATIENT_URL,
  REVCYCLE_URL,
  PLATFORM_URL,
  API_URL,
  LOGIN_ENDPOINT,
  ALLOWED_ORIGINS,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
}
