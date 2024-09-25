import { API_URL, AUTH_URL } from '@/constants'

const USER_ENDPOINT = `${API_URL}/api/users/self`
const REFRESH_ENDPOINT = `${AUTH_URL}/refresh`
const SESSION_ENDPOINT = `${AUTH_URL}/session`
const LOGIN_ENDPOINT = `${AUTH_URL}/login`
const GET_PATIENT_NOTIFICATIONS_ENDPOINT = `${API_URL}/api/patientnotifications/actions/search`
const SEARCH_PATIENTS_ENDPOINT = `${API_URL}/api/patients/search`
const CLINIC_LOCATIONS_ENDPOINT = `${API_URL}/api/clinics`
const FACILITY_ADMISSION_ID_ENDPOINT = `${API_URL}/api/facilityadmissionids`
const LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const VISIT_TYPES_ENDPOINT = `${API_URL}/api/visittypes/actions/search`
const ENCOUNTER_TYPES_ENDPOINT = `${API_URL}/api/encounters/actions/search`
const STATES_BY_COUNTRY_ENDPOINT = (countryCode: string) =>
  `${API_URL}/api/countries/${countryCode}/states`
const ADD_VACATION = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}/vacations`
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
const GET_INSURANCE_PAYERS_ENDPOINT = `${API_URL}/api/insurance/payers?includePlans=false&includeInactive=false&includeTest=false&publicViewable=true&offset=0&limit=0`
const GET_INSURANCE_PAYER_PLANS = (payerId: string) =>
  `${API_URL}/api/insurance/payers/${payerId}?includePlans=true&includeInactive=false&includeTest=false&publicViewable=true`
const GET_USER_PERMISSIONS_ENDPOINT = `${API_URL}/api/users/self/permissions`
const SEARCH_LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const SEARCH_BOOKED_APPOINTMENTS_ENDPOINT = `${API_URL}/api/appointments/actions/search`
const GET_AVAILABLE_APPOINTMENT_ENDPOINT = `${API_URL}/api/schedules/availability/search`
const ADD_PATIENT_RELATIONSHIP_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/relationships`
const DELETE_PATIENT_RELATIONSHIP_ENDPOINT = (
  patientId: string,
  relationshipId: string,
) => `${API_URL}/api/patients/${patientId}/relationships/${relationshipId}`

export {
  USER_ENDPOINT,
  REFRESH_ENDPOINT,
  SESSION_ENDPOINT,
  LOGIN_ENDPOINT,
  SEARCH_PATIENTS_ENDPOINT,
  CLINIC_LOCATIONS_ENDPOINT,
  FACILITY_ADMISSION_ID_ENDPOINT,
  LOCATION_SERVICES_ENDPOINT,
  VISIT_TYPES_ENDPOINT,
  ENCOUNTER_TYPES_ENDPOINT,
  STATES_BY_COUNTRY_ENDPOINT,
  ADD_VACATION,
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
  GET_INSURANCE_PAYERS_ENDPOINT,
  GET_INSURANCE_PAYER_PLANS,
  GET_USER_PERMISSIONS_ENDPOINT,
  SEARCH_LOCATION_SERVICES_ENDPOINT,
  SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
  GET_AVAILABLE_APPOINTMENT_ENDPOINT,
  ADD_PATIENT_RELATIONSHIP_ENDPOINT,
  DELETE_PATIENT_RELATIONSHIP_ENDPOINT,
}
