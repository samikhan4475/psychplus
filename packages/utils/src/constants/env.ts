import { AppEnv } from '../types'

const NODE_ENV = process.env.NODE_ENV
const APP_VERSION = process.env.npm_package_version
const APP_CODE = process.env.APP_CODE
const APP_PATH = process.env.APP_PATH
const APP_ENV = process.env.APP_ENV as AppEnv
const APP_HOST = process.env.APP_HOST
const API_URL = process.env.API_URL
const MOCK_API_URL = process.env.MOCK_API_URL
const CLINICAL_URL = process.env.CLINICAL_URL
const PATIENT_URL = process.env.PATIENT_URL
const REVCYCLE_URL = process.env.REVCYCLE_URL
const LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT
const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export {
  NODE_ENV,
  APP_VERSION,
  APP_CODE,
  APP_PATH,
  APP_ENV,
  APP_HOST,
  API_URL,
  MOCK_API_URL,
  CLINICAL_URL,
  PATIENT_URL,
  REVCYCLE_URL,
  LOGIN_ENDPOINT,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
}
