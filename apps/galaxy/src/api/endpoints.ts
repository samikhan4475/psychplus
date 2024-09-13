import { API_URL, AUTH_URL } from '@/constants'

const USER_ENDPOINT = `${API_URL}/api/users/self`
const REFRESH_ENDPOINT = `${AUTH_URL}/refresh`
const SESSION_ENDPOINT = `${AUTH_URL}/session`
const LOGIN_ENDPOINT = `${AUTH_URL}/login`
const GET_PATIENT_NOTIFICATIONS_ENDPOINT = `${API_URL}/api/patientnotifications/actions/search`
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
const GET_STAFF_ENDPOINT = `${API_URL}/api/staff/search`
const GET_CLINICS_ENDPOINT = `${API_URL}/api/clinics`
const GET_PROVIDERS_ENDPOINT = `${API_URL}/api/staff/search`
const GET_VISIT_TYPE_ENDPOINT = `${API_URL}/api/encounters/actions/search`
const GET_PATIENT_RELATIONSHIPS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/relationships`
const GET_PATIENT_PREFERRED_PARTNERS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/preferredpartners`

export {
  USER_ENDPOINT,
  REFRESH_ENDPOINT,
  SESSION_ENDPOINT,
  LOGIN_ENDPOINT,
  SEARCH_PATIENTS_ENDPOINT,
  GET_PATIENT_NOTIFICATIONS_ENDPOINT,
  PATIENT_PROFILE_ENDPOINT,
  NOTE_DETAILS_SEARCH_ENDPOINT,
  NOTE_DETAILS_SAVE_ENDPOINT,
  GET_PATIENT_PROFILE_ENDPOINT,
  GET_PATIENT_CONSENTS_ENDPOINT,
  SEND_POLICY_NOTICE_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
  METADATA_CODESET_ENDPOINT,
  GET_STAFF_ENDPOINT,
  GET_CLINICS_ENDPOINT,
  GET_PROVIDERS_ENDPOINT,
  GET_VISIT_TYPE_ENDPOINT,
  GET_PATIENT_RELATIONSHIPS,
  GET_PATIENT_PREFERRED_PARTNERS,
}
