import { API_URL, AUTH_URL } from '@/constants'

const USER_ENDPOINT = `${API_URL}/api/users/self`
const REFRESH_ENDPOINT = `${AUTH_URL}/refresh`
const SESSION_ENDPOINT = `${AUTH_URL}/session`
const LOGIN_ENDPOINT = `${AUTH_URL}/login`
const SEARCH_PATIENTS_ENDPOINT = `${API_URL}/api/patients/search`
const PATIENT_PROFILE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/profile`
const NOTE_DETAILS_SEARCH_ENDPOINT = `${API_URL}/api/notedetails/actions/search`
const NOTE_DETAILS_SAVE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/notedetails`
const GET_PATIENT_PROFILE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/profile`
const GET_PATIENT_CONSENTS_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/consents`
const SEND_POLICY_NOTICE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/consents/actions/sendnotice`
const STANDARD_CODESET_ENDPOINT = (
  assigningAuthority: string,
  codeSystemName: string,
) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthority}/codesets/${codeSystemName}`
const METADATA_CODESET_ENDPOINT = (name: string) =>
  `${API_URL}/api/metadata/codesets/${name}`

export {
  USER_ENDPOINT,
  REFRESH_ENDPOINT,
  SESSION_ENDPOINT,
  LOGIN_ENDPOINT,
  SEARCH_PATIENTS_ENDPOINT,
  PATIENT_PROFILE_ENDPOINT,
  NOTE_DETAILS_SEARCH_ENDPOINT,
  NOTE_DETAILS_SAVE_ENDPOINT,
  GET_PATIENT_PROFILE_ENDPOINT,
  GET_PATIENT_CONSENTS_ENDPOINT,
  SEND_POLICY_NOTICE_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
  METADATA_CODESET_ENDPOINT,
}
