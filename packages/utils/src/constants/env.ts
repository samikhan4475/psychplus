import { AppEnv } from '../types'

const NODE_ENV = process.env.NODE_ENV
const APP_CODE = process.env.APP_CODE
const APP_VERSION = process.env.npm_package_version
const APP_PATH = process.env.APP_PATH
const APP_ENV = process.env.APP_ENV as AppEnv
const API_URL = process.env.API_URL
const MOCK_API_URL = process.env.MOCK_API_URL
const CLINICAL_URL = process.env.CLINICAL_URL
const PATIENT_URL = process.env.PATIENT_URL
const REVCYCLE_URL = process.env.REVCYCLE_URL
const LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT

export {
  NODE_ENV,
  APP_CODE,
  APP_VERSION,
  APP_PATH,
  APP_ENV,
  API_URL,
  MOCK_API_URL,
  CLINICAL_URL,
  PATIENT_URL,
  REVCYCLE_URL,
  LOGIN_ENDPOINT,
}
