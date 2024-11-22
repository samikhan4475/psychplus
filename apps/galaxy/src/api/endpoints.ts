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
const LOCATION_ENDPOINT = `${API_URL}/api/locations/actions/search`
const VISIT_TYPES_ENDPOINT = `${API_URL}/api/visittypes/actions/search`
const STATES_BY_COUNTRY_ENDPOINT = (countryCode: string) =>
  `${API_URL}/api/countries/${countryCode}/states`
const ADD_VACATION = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}/vacations`
const PATIENT_PROFILE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/profile`
const NOTE_DETAILS_SEARCH_ENDPOINT = `${API_URL}/api/notedetails/actions/search`
const NOTE_DETAILS_HISTORY_ENDPOINT = `${API_URL}/api/notedetails/history/search`
const PCP_HISTORY_ENDPOINT = `${API_URL}/api/externalproviders/actions/relationships/history/search`
const SERVICE_DIAGNOSIS_SEARCH_ENDPOINT = `${API_URL}/api/metadata/icd10codes/actions/search`
const ADD_MASTER_FEE_SCHEDULE_ENDPOINT = `${API_URL}/api/masterfeeschedules`
const MASTER_FEE_SCHEDULE_ENDPOINT = (scheduleId: string) =>
  `${API_URL}/api/masterfeeschedules/${scheduleId}`
const ADD_ON_DRUGS_SEARCH_ENDPOINT = `${API_URL}/api/drugs/core/actions/search`
const NOTE_DETAILS_SAVE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/notedetails`
const NOTE_SIGN_ENDPOINT = (patientId: string, appointmentId: string) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes`
const GET_PATIENT_PROFILE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/profile`
const GET_PATIENT_CONSENTS_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/consents?includeHistory=true`
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
const GET_FACILITY_ADMISSION_IDS_ENDPOINT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/actions/facilityadmitids`
const GET_INSURANCE_PAYMENT_DETAIL_ENDPOINT = (paymentId: string) =>
  `${API_URL}/api/payments/${paymentId}`
const GET_PATIENT_RELATIONSHIPS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/relationships`
const GET_PATIENT_PREFERRED_PARTNERS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/preferredpartners`
const GET_INSURANCE_PAYERS_ENDPOINT = (includePlans: boolean) =>
  `${API_URL}/api/insurance/payers?includePlans=${includePlans}&includeInactive=false&includeTest=false&publicViewable=true&offset=0&limit=0`
const GET_INSURANCE_PAYER_PLANS = (payerId: string) =>
  `${API_URL}/api/insurance/payers/${payerId}?includePlans=true&includeInactive=false&includeTest=false&publicViewable=true`
const GET_USER_PERMISSIONS_ENDPOINT = `${API_URL}/api/users/self/organizations?includePermissions=true`
const SEARCH_LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const SEARCH_BOOKED_APPOINTMENTS_ENDPOINT = `${API_URL}/api/appointments/actions/search`
const GET_CLEARNING_HOUSE_RECEIVERS = `${API_URL}/api/clearinghousereceivers/actions/search`
const GET_CLEARNING_HOUSE_EDI_ENDPOINT = `${API_URL}/api/integrationconfiguration/insuranceplans/actions/search`
const ADD_CLEARNING_HOUSE_EDI_ENDPOINT = `${API_URL}/api/integrationconfiguration/insuranceplans`
const UPDATE_CLEARNING_HOUSE_EDI_ENDPOINT = (id: string) =>
  `${API_URL}/api/integrationconfiguration/insuranceplans/${id}`
const DELETE_CLEARNING_HOUSE_EDI_ENDPOINT = (id: string) =>
  `${API_URL}/api/integrationconfiguration/insuranceplans/${id}`
const GET_PATIENT_CONSENT_SIGNED_PDF_ENDPOINT = (
  patientId: string,
  consentId: string,
) => `${API_URL}/api/patients/${patientId}/consents/${consentId}/signedpdf`
const ADD_PATIENT_ENDPOINT = `${API_URL}/api/users/actions/patientsignup`
const GET_US_STATES_ENDPOINT = `${API_URL}/api/countries/united states/states`
const GET_STATES_LOCATIONS_ENDPOINT = (stateId: string) =>
  `${API_URL}/api/clinics?stateId=${stateId}`
const SEARCH_INSURANCE_PLANS_ENDPOINT = `${API_URL}/api/insurance/plans/actions/search`
const GET_PATIENT_STAFF_COMMENTS_ENDPOINT = `${API_URL}/api/staffcomments/actions/search`
const DELETE_STAFF_COMMENT_ENDPOINT = (commentId: number) =>
  `${API_URL}/api/staffcomments/${commentId}`
const CREATE_STAFF_COMMENT_ENDPOINT = (appointmentId: number) =>
  `${API_URL}/api/appointments/${appointmentId}/staffcomments`
const Update_STAFF_COMMENT_ENDPOINT = (commentId: number) =>
  `${API_URL}/api/staffcomments/${commentId}`
const GET_AVAILABLE_APPOINTMENT_ENDPOINT = `${API_URL}/api/schedules/availability/search`
const GET_SECURE_MESSAGES = `${API_URL}/api/users/self/securemessaging/messages/actions/search`
const UPDATE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}`
const UPDATE_CHANNEL_MESSAGES_STATUS = (messageId: string, channelId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/channels/${channelId}`
const CREATE_CHANNEL_SECURE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/channels`
const GET_CHANNEL_SECURE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/channels`
const ATTACHMENTS_SECURE_MESSAGE = (messageId: string, attachmentId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/attachments/${attachmentId}/actions/upload?fileDescription=${messageId}`
const INITIALIZE_ATTACHMENT_SECURE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/attachments/actions/initialize`
const UPLOAD_ATTACHMENT_SECURE_MESSAGE = (
  messageId: string,
  attachmentId: string,
) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/attachments/${attachmentId}/actions/upload`
const DOWNLOAD_ATTACHMENTS_FILE_SECURE_MESSAGE = (
  messageId: string,
  attachmentId: string,
) =>
  `${API_URL}/api/securemessaging/messages/${messageId}/attachments/${attachmentId}/actions/download`
const DELETE_ATTACHMENTS_SECURE_MESSAGE = (
  messageId: string,
  attachmentId: string,
) =>
  `${API_URL}/api/securemessaging/messages/${messageId}/attachements/${attachmentId}`
const SEND_SECURE_MESSAGE = `${API_URL}/api/users/self/securemessaging/messages`
const CREATE_FORWARD_SECURE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessaging/messages/${messageId}/actions/forward`
const GET_RECIPIENT_SECURE_MESSAGE = (messageId: string) =>
  `${API_URL}/api/users/self/securemessages/${messageId}/recipients/actions/search`
const SEARCH_PHARMACIES = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/actions/search`
const GET_PATIENT_BILLING_HISTORY = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/billinghistory/actions/search`
const ADD_PATIENT_RELATIONSHIP_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/relationships`
const ADD_PCP_ENDPOINT = () => `${API_URL}/api/externalproviders`
const FETCH_EXTERNAL_PROVIDER_WITH_PATIENT_ENDPOINT = () =>
  `${API_URL}/api/externalproviders/actions/relationships/search`
const FETCH_EXTERNAL_PROVIDERS_ENDPOINT = () =>
  `${API_URL}/api/externalproviders/actions/search`
const ATTACH_PCP_TO_PATIENT_ENDPOINT = (patientId: string, pcpId: string) =>
  `${API_URL}/api/externalproviders/${pcpId}/patients/${patientId}/actions/associate`
const DELETE_PATIENT_RELATIONSHIP_ENDPOINT = (
  patientId: string,
  relationshipId: string,
) => `${API_URL}/api/patients/${patientId}/relationships/${relationshipId}`
const SEARCH_AVAILABLE_APPOINTMENT_SLOTS_ENDPOINT = `${API_URL}/api/schedules/availability/search`
const GET_PATIENT_CREDIT_CARDS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/creditcards?includeInactive=true`
const SET_PRIMARY_PATIENT_CREDIT_CARD = (
  patientId: number,
  creditCardId: number,
) =>
  `${API_URL}/api/patients/${patientId}/creditcards/${creditCardId}/actions/setdefault`
const DELETE_PATIENT_CREDIT_CARD = (patientId: number, creditCardId: number) =>
  `${API_URL}/api/patients/${patientId}/creditcards/${creditCardId}`
const ADD_PATIENT_CREDIT_CARD = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/creditcards`
const GET_PATIENT_POLICIES = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/policies?includeInactive=true`
const ADD_PATIENT_POLICY_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/policies`
const UPDATE_PATIENT_POLICY_ENDPOINT = (patientId: string, policyId: string) =>
  `${API_URL}/api/patients/${patientId}/policies/${policyId}`
const DELETE_PATIENT_POLICY_ENDPOINT = (patientId: string, policyId: string) =>
  `${API_URL}/api/patients/${patientId}/policies/${policyId}`
const UPDATE_INSURANCE_PAYMENT_ENDPOINT = (id: string) =>
  `${API_URL}/api/payments/${id}`
const INSURANCE_PAYMENT_ATTACHMENTS_ENDPOINT = (paymentId: string) =>
  `${API_URL}/api/payments/${paymentId}/attachments`
const ADD_INSURANCE_PAYMENT_ENDPOINT = `${API_URL}/api/payments`
const GET_PATIENT_PAYMENT_HISTORY = `${API_URL}/api/patients/all/transactions/search`
const GET_PATIENT_TRANSACTIONS_HISTORY = (
  patientId: number,
  transactionId: number,
) =>
  `${API_URL}/api/patients/${patientId}/transactions/${transactionId}/actions/history`
const GET_CLEARING_HOUSE_RECEIVER_LIST_ENDPOINT = `${API_URL}/api/clearinghousereceivers/actions/search`
const DELETE_CLEARING_HOUSE_RECEIVER_ENDPOINT = (id: string) =>
  `${API_URL}/api/clearinghousereceivers/${id}`
const ADD_CLEARING_HOUSE_RECEIVER_ENDPOINT = `${API_URL}/api/clearinghousereceivers`
const UPDATE_CLEARING_HOUSE_RECEIVER_ENDPOINT = (id: string) =>
  `${API_URL}/api/clearinghousereceivers/${id}`
const GET_INSURANCE_PAYMENT_LIST_ENDPOINT = `${API_URL}/api/payments/actions/search`
const GET_PRACTICE_IDS_LIST_ENDPOINT = `${API_URL}/api/practices/actions/search`
const DELETE_INSURANCE_PAYMENT_ENDPOINT = (id: string) =>
  `${API_URL}/api/payments/${id}`
const GENERATE_PATIENT_STATEMENTS_ENDPOINT = (fileFormat: string) =>
  `${API_URL}/api/billingstatements/actions/generate/${fileFormat}`
const DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT = (fileFormat: string) =>
  `${API_URL}/api/billingstatements/actions/preview/${fileFormat}`
const GET_PATIENT_STATEMENTS_LIST_ENDPOINT = `${API_URL}/api/billingstatements/actions/search`
const GET_RESPONSE_HISTORY_LIST_ENDPOINT = `${API_URL}/api/claimssubmissions/responses/actions/search`
const GET_RESPONSE_HISTORY_DETAIL_LIST_ENDPOINT = (id: string) =>
  `${API_URL}/api/claimssubmissions/responses/${id}/details/actions/search`
const GET_CLAIMS_LIST_ENDPOINT = `${API_URL}/api/claims/actions/search`
const CLAIM_SUBMIT_ENDPOINT = `${API_URL}/api/claimssubmissions/actions/srcubandsubmit`
const GET_CLAIM_SUBMISSION_LIST = `${API_URL}/api/claimssubmissions/actions/search`
const CLAIM_SUBMISSION_REJECTION_DETAIL_ENDPOINT = (claimId: string) =>
  `${API_URL}/api/claims/${claimId}/claimvalidations/actions/search`
const GET_CLAIM_SUBMISSION_HISTORY = `${API_URL}/api/claimssubmissions/batches/actions/search`
const GET_CLAIM_SUBMISSION_HISTORY_DETAIL = (batchId: string) =>
  `${API_URL}/api/claimssubmissions/batches/${batchId}/details/actions/search?isIncludeMetadataResourceChangeControl=true`
const DELETE_CLAIM_ENDPOINT = (id: string) => `${API_URL}/api/claims/${id}`
const GET_PATIENT_POLICY_HISTORY_ENDPOINT = (
  patientId: string,
  policyId: string,
) =>
  `${API_URL}/api/patients/${patientId}/policies/${policyId}/history/actions/search`
const GET_REPORTS_CATEGORY_ENDPOINT = `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/ReportCategory`
const GET_REPORTS_TEMPLATES_ENDPOINT = `${API_URL}/api/reporting/templates/actions/search?offset=0&limit=0&orderBy=displayname%20asc`
const GET_REPORTS_PARAMETER_ENDPOINT = `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/ReportParameterType`
const GET_TEMPLATE_REPORT = (templateId: string, reportType: string) =>
  `${API_URL}/api/reporting/templates/${templateId}/actions/run?exportType=${reportType}`
const GET_PATIENTS_INFO_HISTORY = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/history/search`
const GET_PATIENT_HISOTRY_PROFILE_IMAGE_ENDPOINT = (
  patientId: string,
  historyId: number,
) => `/ehr/api/patients/${patientId}/history/${historyId}/profileimage`
const ADD_CLAIM_PAYMENT = (paymentId: string) =>
  `${API_URL}/api/payments/${paymentId}/claimpayments`
const UPDATE_CLAIM_PAYMENT = (paymentId: string, claimPaymentId: string) =>
  `${API_URL}/api/payments/${paymentId}/claimpayments/${claimPaymentId}`
const GET_PATIENT_HISOTRY_DRIVING_LICENSE_IMAGE_ENDPOINT = (
  patientId: string,
  historyId: number,
  side: string,
) =>
  `/ehr/api/patients/${patientId}/history/${historyId}/driverslicenseimage/${side}`
const GET_PATIENT_PROFILE_IMAGE_ENDPOINT = (patientId: string) =>
  `${API_URL}/ehr/api/patients/${patientId}/profileimage`
const GET_PATIENT_DRIVER_LICENSE_IMAGE_ENDPOINT = (
  patientId: string,
  side: string,
) => `${API_URL}/ehr/api/patients/${patientId}/driverslicenseimage/${side}`
const UPDATE_PATIENT_PROFILE_ENDPOINT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}`
const UPDATE_PATIENT_PROFILE_IMAGE_ENDPOINT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}/profileimage`
const UPDATE_PATIENT_DRIVING_LICENSE_IMAGE_ENDPOINT = (
  patientId: number,
  side: string,
) => `${API_URL}/api/patients/${patientId}/driverslicenseimage/${side}`
const GET_ORGANIZATION_ROLES = `${API_URL}/api/organizations/actions/search`
const GET_PATIENT_UNPAID_APPOINTMENTS_ENDPOINT = (
  patientId: string,
  paymentType: string,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/actions/unpaid/${paymentType}`
const GET_ORGANIZATIONS_ENDPOINT = `${API_URL}/api/organizations/actions/search`
const GET_INSURANCE_PAYERS_LIST_ENDPOINT = `${API_URL}/api/insurance/plans/actions/search`
const GET_PRACTICES_ENDPOINT = `${API_URL}/api/practices/actions/search`
const GET_PATIENT_VITALS_ENDPOINT = `${API_URL}/api/patientvitalsigns/actions/search`
const ADD_PATIENT_VITAL_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/vitalsigns`
const UPDATE_PATIENT_VITAL_ENDPOINT = (
  patientId: string,
  vitalSignId: string,
) => `${API_URL}/api/patients/${patientId}/vitalsigns/${vitalSignId}`
const GET_STAFF = `${API_URL}/api/staff?includeInactive=false&offset=0&limit=0&orderBy=legalName asc`
const GET_POS_CODES = `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/PlaceOfService?includeExtraDetails=false&offset=0&limit=100&orderBy=displayName asc`
const ADD_NO_EMAIL_PATIENT_ENDPOINT = `${API_URL}/api/users/actions/patientsignup`
const GET_CLEARNING_HOUSE_SUBMITTER_ENDPOINT = `${API_URL}/api/clearinghousesubmitters/actions/search`
const DELETE_CLEARNING_HOUSE_SUBMITTER_ENDPOINT = (id: string) =>
  `${API_URL}/api/clearinghousesubmitters/${id}`
const ADD_CLEARNING_HOUSE_SUBMITTER_ENDPOINT = `${API_URL}/api/clearinghousesubmitters`
const UPDATE_CLEARNING_HOUSE_SUBMITTER_ENDPOINT = (id: string) =>
  `${API_URL}/api/clearinghousesubmitters/${id}`
const GET_MASTER_FEE_SCHEDULES = `${API_URL}/api/masterfeeschedules/actions/search`
const GET_PROCEDURES_CODES = (codeStartsWith: string) =>
  `${API_URL}/api/codeset/authorities/AMA/codesets/CPT4?codeStartsWith=${codeStartsWith}&includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`
const GET_MODIFIERS_CODES = (codeStartsWith: string) =>
  `${API_URL}/api/codeset/authorities/AMA/codesets/CPT4Modifiers?codeStartsWith=${codeStartsWith}&includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`
const GET_CPT_CODES = (codeStartsWith: string) =>
  `${API_URL}/api/codeset/authorities/AMA/codesets/CPT4?codeStartsWith=${codeStartsWith}&includeExtraDetails=false&offset=0&limit=0&orderBy=displayName%20asc`
const GET_CLAIM_BY_ID = (claimId: string) => `${API_URL}/api/claims/${claimId}`
const UPDATE_CLAIM = (claimId: string) => `${API_URL}/api/claims/${claimId}`
const ADD_REPORT_TEMPLATE_ENDPOINT = `${API_URL}/api/reporting/templates`
const UPLOAD_TEMPLATE_REPORT_ENDPOINT = (templateId: string) =>
  `${API_URL}/api/reporting/templates/${templateId}/actions/importdefinition`
const EDIT_TEMPLATE_ENDPOINT = (templateId: string) =>
  `${API_URL}/api/reporting/templates/${templateId}/`
const GET_ALL_STAFF_ENDPOINT = `${API_URL}/api/staff`
const UPDATE_PATIENT_ENDPOINT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}`

const SEARCH_STAFF_ENDPOINT = `${API_URL}/api/staff/search?limit=10`
const GET_SELF_STAFF_DETAILS_ENDPOINT = `${API_URL}/api/staff/self`
const GET_PATIENT_REFERRALS_ENDPOINT = `${API_URL}/api/referrals/search`
const GET_PATIENT_REFERRALS_HISTORY_ENDPOINT = (liveReferralId: string) =>
  `${API_URL}/api/referrals/${liveReferralId}/history/search`
const UPDATE_PATIENT_REFERRAL_ENDPOINT = (
  patientId: number,
  referralId: number,
) => `${API_URL}/api/patients/${patientId}/referrals/${referralId}`
const GET_APPOINTMENT = (appointmentId: string) =>
  `${API_URL}/api/appointments/${appointmentId}`
const CREATE_PATIENT_REFERRAL_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/referrals`
const DELETE_PATIENT_APPOINTMENT_ENDPOINT = (
  patientId: number,
  appointmentId: number,
) => `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}`

const SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT = `${API_URL}/api/staff/self/diagnoses/actions/favorites/search`
const FAVOURITE_DIAGNOSIS_ENDPOINT = (icd10Code: string) =>
  `${API_URL}/api/staff/self/icd10codes/${icd10Code}/actions/favorites`
const DOWNLOAD_TEMPLATE_REPORT = (templateId: string) =>
  `${API_URL}/api/reporting/templates/${templateId}/actions/download`
const CREATE_PATIENT_CUSTOM_CHARGE_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/transactions`
const PATIENT_CUSTOM_CHARGE_ENDPOINT = (
  patientId: number,
  transactionId: number,
) => `${API_URL}/api/patients/${patientId}/transactions/${transactionId}`
const GET_PATIENT_PAYMENTS_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/payments`
const DOWNLOAD_PATIENT_PAYMENTS_PDF_ENDPOINT = (patientId: string) =>
  `/api/patients/${patientId}/payments/actions/receipts/pdf`
const PATIENT_CHARGE_PAYMENT_ENDPOINT = `${API_URL}/api/payments/actions/charge`

const UPDATE_PATIENT_RELATIONSHIP_ENDPOINT = (
  patientId: number,
  relationshipId: string,
) => `${API_URL}/api/patients/${patientId}/relationships/${relationshipId}`
const GET_ALLERGIES_ENDPOINT = `${API_URL}/api/allergies/actions/search`
const PATIENT_CARE_TEAM_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/careteam`

const GET_STAFF_LICENSE = `${API_URL}/api/stafflicenses/actions/search`
const GET_SCRIPT_SURE_SESSION_TOKEN = (partnerShortName: string) =>
  `${API_URL}/api/integration/partners/${partnerShortName}/actions/authtoken`
const GET_SCRIPT_SURE_EXTERNAL_PATIENT_ID = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/prescriptions/actions/externalpatient/search`

export {
  USER_ENDPOINT,
  REFRESH_ENDPOINT,
  GET_CLAIM_SUBMISSION_LIST,
  ADD_CLAIM_PAYMENT,
  UPDATE_CLAIM_PAYMENT,
  ADD_MASTER_FEE_SCHEDULE_ENDPOINT,
  MASTER_FEE_SCHEDULE_ENDPOINT,
  GET_CLEARNING_HOUSE_RECEIVERS,
  SESSION_ENDPOINT,
  LOGIN_ENDPOINT,
  SEARCH_PATIENTS_ENDPOINT,
  CLINIC_LOCATIONS_ENDPOINT,
  FACILITY_ADMISSION_ID_ENDPOINT,
  LOCATION_SERVICES_ENDPOINT,
  LOCATION_ENDPOINT,
  VISIT_TYPES_ENDPOINT,
  STATES_BY_COUNTRY_ENDPOINT,
  ADD_VACATION,
  GET_PATIENT_NOTIFICATIONS_ENDPOINT,
  PATIENT_PROFILE_ENDPOINT,
  NOTE_DETAILS_SEARCH_ENDPOINT,
  NOTE_DETAILS_HISTORY_ENDPOINT,
  SERVICE_DIAGNOSIS_SEARCH_ENDPOINT,
  ADD_ON_DRUGS_SEARCH_ENDPOINT,
  NOTE_DETAILS_SAVE_ENDPOINT,
  GET_PATIENT_PROFILE_ENDPOINT,
  GET_PATIENT_CONSENTS_ENDPOINT,
  SEND_POLICY_NOTICE_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
  METADATA_CODESET_ENDPOINT,
  GET_STAFF_ENDPOINT,
  GET_CLINICS_ENDPOINT,
  GET_STAFF,
  GET_PROVIDERS_ENDPOINT,
  GET_VISIT_TYPE_ENDPOINT,
  GET_FACILITY_ADMISSION_IDS_ENDPOINT,
  GET_PATIENT_RELATIONSHIPS,
  GET_PATIENT_PREFERRED_PARTNERS,
  GET_INSURANCE_PAYERS_ENDPOINT,
  GET_INSURANCE_PAYER_PLANS,
  GET_USER_PERMISSIONS_ENDPOINT,
  SEARCH_LOCATION_SERVICES_ENDPOINT,
  SEARCH_BOOKED_APPOINTMENTS_ENDPOINT,
  ADD_PATIENT_ENDPOINT,
  GET_US_STATES_ENDPOINT,
  GET_STATES_LOCATIONS_ENDPOINT,
  SEARCH_INSURANCE_PLANS_ENDPOINT,
  GET_PATIENT_STAFF_COMMENTS_ENDPOINT,
  GET_INSURANCE_PAYMENT_DETAIL_ENDPOINT,
  DELETE_STAFF_COMMENT_ENDPOINT,
  CREATE_STAFF_COMMENT_ENDPOINT,
  Update_STAFF_COMMENT_ENDPOINT,
  GET_AVAILABLE_APPOINTMENT_ENDPOINT,
  GET_SECURE_MESSAGES,
  SEND_SECURE_MESSAGE,
  CREATE_FORWARD_SECURE_MESSAGE,
  GET_RECIPIENT_SECURE_MESSAGE,
  CREATE_CHANNEL_SECURE_MESSAGE,
  ATTACHMENTS_SECURE_MESSAGE,
  SEARCH_PHARMACIES,
  GET_PATIENT_BILLING_HISTORY,
  ADD_PATIENT_RELATIONSHIP_ENDPOINT,
  DELETE_PATIENT_RELATIONSHIP_ENDPOINT,
  GET_CHANNEL_SECURE_MESSAGE,
  UPDATE_CHANNEL_MESSAGES_STATUS,
  SEARCH_AVAILABLE_APPOINTMENT_SLOTS_ENDPOINT,
  GET_PATIENT_CONSENT_SIGNED_PDF_ENDPOINT,
  GET_PATIENT_CREDIT_CARDS,
  SET_PRIMARY_PATIENT_CREDIT_CARD,
  DELETE_PATIENT_CREDIT_CARD,
  ADD_PATIENT_CREDIT_CARD,
  GET_CLAIMS_LIST_ENDPOINT,
  GET_CLAIM_SUBMISSION_HISTORY,
  DELETE_CLAIM_ENDPOINT,
  GET_PATIENT_POLICIES,
  ADD_PATIENT_POLICY_ENDPOINT,
  UPDATE_PATIENT_POLICY_ENDPOINT,
  DELETE_PATIENT_POLICY_ENDPOINT,
  GET_PATIENT_PAYMENT_HISTORY,
  GET_PATIENT_TRANSACTIONS_HISTORY,
  GET_PATIENT_POLICY_HISTORY_ENDPOINT,
  GET_REPORTS_CATEGORY_ENDPOINT,
  GET_REPORTS_TEMPLATES_ENDPOINT,
  GET_REPORTS_PARAMETER_ENDPOINT,
  CLAIM_SUBMIT_ENDPOINT,
  CLAIM_SUBMISSION_REJECTION_DETAIL_ENDPOINT,
  GET_TEMPLATE_REPORT,
  DELETE_ATTACHMENTS_SECURE_MESSAGE,
  DOWNLOAD_ATTACHMENTS_FILE_SECURE_MESSAGE,
  GET_PATIENTS_INFO_HISTORY,
  GET_PATIENT_HISOTRY_PROFILE_IMAGE_ENDPOINT,
  GET_PATIENT_HISOTRY_DRIVING_LICENSE_IMAGE_ENDPOINT,
  GET_PATIENT_DRIVER_LICENSE_IMAGE_ENDPOINT,
  UPDATE_PATIENT_PROFILE_ENDPOINT,
  UPDATE_PATIENT_PROFILE_IMAGE_ENDPOINT,
  UPDATE_PATIENT_DRIVING_LICENSE_IMAGE_ENDPOINT,
  GET_INSURANCE_PAYMENT_LIST_ENDPOINT,
  GET_CLAIM_SUBMISSION_HISTORY_DETAIL,
  DELETE_INSURANCE_PAYMENT_ENDPOINT,
  GET_PATIENT_PROFILE_IMAGE_ENDPOINT,
  ADD_INSURANCE_PAYMENT_ENDPOINT,
  UPDATE_INSURANCE_PAYMENT_ENDPOINT,
  INSURANCE_PAYMENT_ATTACHMENTS_ENDPOINT,
  GET_PRACTICE_IDS_LIST_ENDPOINT,
  GET_ORGANIZATION_ROLES,
  GET_PATIENT_UNPAID_APPOINTMENTS_ENDPOINT,
  GET_POS_CODES,
  GET_CLEARING_HOUSE_RECEIVER_LIST_ENDPOINT,
  DELETE_CLEARING_HOUSE_RECEIVER_ENDPOINT,
  ADD_CLEARING_HOUSE_RECEIVER_ENDPOINT,
  UPDATE_CLEARING_HOUSE_RECEIVER_ENDPOINT,
  GET_PATIENT_STATEMENTS_LIST_ENDPOINT,
  INITIALIZE_ATTACHMENT_SECURE_MESSAGE,
  UPLOAD_ATTACHMENT_SECURE_MESSAGE,
  GET_MASTER_FEE_SCHEDULES,
  GET_PROCEDURES_CODES,
  GET_MODIFIERS_CODES,
  GET_CLAIM_BY_ID,
  GET_ORGANIZATIONS_ENDPOINT,
  GET_PRACTICES_ENDPOINT,
  GET_PATIENT_VITALS_ENDPOINT,
  ADD_NO_EMAIL_PATIENT_ENDPOINT,
  GET_CLEARNING_HOUSE_SUBMITTER_ENDPOINT,
  DELETE_CLEARNING_HOUSE_SUBMITTER_ENDPOINT,
  ADD_CLEARNING_HOUSE_SUBMITTER_ENDPOINT,
  UPDATE_CLEARNING_HOUSE_SUBMITTER_ENDPOINT,
  UPDATE_CLAIM,
  ADD_PATIENT_VITAL_ENDPOINT,
  UPDATE_PATIENT_VITAL_ENDPOINT,
  GENERATE_PATIENT_STATEMENTS_ENDPOINT,
  DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT,
  UPDATE_MESSAGE,
  ADD_REPORT_TEMPLATE_ENDPOINT,
  UPLOAD_TEMPLATE_REPORT_ENDPOINT,
  EDIT_TEMPLATE_ENDPOINT,
  GET_ALL_STAFF_ENDPOINT,
  UPDATE_PATIENT_ENDPOINT,
  SEARCH_STAFF_ENDPOINT,
  GET_PATIENT_REFERRALS_ENDPOINT,
  GET_PATIENT_REFERRALS_HISTORY_ENDPOINT,
  GET_SELF_STAFF_DETAILS_ENDPOINT,
  UPDATE_PATIENT_REFERRAL_ENDPOINT,
  CREATE_PATIENT_REFERRAL_ENDPOINT,
  GET_INSURANCE_PAYERS_LIST_ENDPOINT,
  SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
  FAVOURITE_DIAGNOSIS_ENDPOINT,
  GET_APPOINTMENT,
  GET_CLEARNING_HOUSE_EDI_ENDPOINT,
  ADD_CLEARNING_HOUSE_EDI_ENDPOINT,
  UPDATE_CLEARNING_HOUSE_EDI_ENDPOINT,
  DELETE_CLEARNING_HOUSE_EDI_ENDPOINT,
  GET_RESPONSE_HISTORY_LIST_ENDPOINT,
  GET_RESPONSE_HISTORY_DETAIL_LIST_ENDPOINT,
  DOWNLOAD_TEMPLATE_REPORT,
  CREATE_PATIENT_CUSTOM_CHARGE_ENDPOINT,
  PATIENT_CUSTOM_CHARGE_ENDPOINT,
  DOWNLOAD_PATIENT_PAYMENTS_PDF_ENDPOINT,
  GET_PATIENT_PAYMENTS_ENDPOINT,
  UPDATE_PATIENT_RELATIONSHIP_ENDPOINT,
  ADD_PCP_ENDPOINT,
  ATTACH_PCP_TO_PATIENT_ENDPOINT,
  FETCH_EXTERNAL_PROVIDER_WITH_PATIENT_ENDPOINT,
  FETCH_EXTERNAL_PROVIDERS_ENDPOINT,
  PCP_HISTORY_ENDPOINT,
  DELETE_PATIENT_APPOINTMENT_ENDPOINT,
  GET_ALLERGIES_ENDPOINT,
  PATIENT_CARE_TEAM_ENDPOINT,
  PATIENT_CHARGE_PAYMENT_ENDPOINT,
  NOTE_SIGN_ENDPOINT,
  GET_STAFF_LICENSE,
  GET_CPT_CODES,
  GET_SCRIPT_SURE_SESSION_TOKEN,
  GET_SCRIPT_SURE_EXTERNAL_PATIENT_ID,
}
