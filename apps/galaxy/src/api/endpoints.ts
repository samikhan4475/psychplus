import { API_URL, AUTH_URL } from '@/constants'

const USER_ENDPOINT = `${API_URL}/api/users/self`
const REFRESH_ENDPOINT = `${AUTH_URL}/refresh`
const SESSION_ENDPOINT = `${AUTH_URL}/session`
const LOGIN_ENDPOINT = `${AUTH_URL}/login`
const FORGOT_PASSWORD_ENDPOINT = `${API_URL}/api/users/self/forgotpassword`
const GET_PATIENT_NOTIFICATIONS_ENDPOINT = `${API_URL}/api/patientnotifications/actions/search`
const SEARCH_PATIENTS_ENDPOINT = `${API_URL}/api/patients/search`
const CLINIC_LOCATIONS_ENDPOINT = `${API_URL}/api/clinics`
const FACILITY_ADMISSION_ID_ENDPOINT = `${API_URL}/api/facilityadmissionids`
const LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const LOCATION_ENDPOINT = `${API_URL}/api/locations/actions/search`
const ADD_USER_SETTINGS = (userId: string) =>
  `${API_URL}/api/users/${userId}/settings`
const UPDATE_USER_SETTINGS = (userId: string, settingId: string) =>
  `${API_URL}/api/users/${userId}/settings/${settingId}`
const GET_FEATURE_FLAG_ENDPOINT = (featureFlag: string) =>
  `${API_URL}/api/featureflags/${featureFlag}/actions/enabled`
const VISIT_TYPES_ENDPOINT = `${API_URL}/api/visittypes/actions/search`
const ADD_SERVICE_ENDPOINT = (locationId: string) =>
  `${API_URL}/api/locations/${locationId}/services`
const FEATURE_FLAGS = `${API_URL}/api/featureflags/actions/search`
const STATES_BY_COUNTRY_ENDPOINT = (countryCode: string) =>
  `${API_URL}/api/countries/${countryCode}/states`
const GET_FEATURE_FLAGS_BY_SHORTNAME_ENDPOINT = (shortName: string) =>
  `${API_URL}/api/featureflags/${shortName}/actions/enabled`
const ADD_VACATION = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}/vacations`
const EDIT_VACATION_ENDPOINT = (staffId: string, vacationId: number) =>
  `${API_URL}/api/staff/${staffId}/vacations/${vacationId}`
const PATIENT_PROFILE_ENDPOINT = (id: string) =>
  `${API_URL}/api/patients/${id}/profile`
const GET_STAFF_VACATION_ENDPOINT = `${API_URL}/api/vacations/actions/search`
const GET_STAFF_VACATION_HISTORY_ENDPOINT = (vacationId: string) =>
  `${API_URL}/api/vacations/${vacationId}/history/actions/search`
const UPDATE_STAFF_VACATION_ENDPOINT = (staffId: number, vacationId: number) =>
  `${API_URL}/api/staff/${staffId}/vacations/${vacationId}`
const NOTE_DETAILS_SEARCH_ENDPOINT = `${API_URL}/api/notedetails/actions/search`
const NOTE_DETAILS_HISTORY_ENDPOINT = `${API_URL}/api/notedetails/history/search`
const PCP_HISTORY_ENDPOINT = `${API_URL}/api/externalproviders/actions/relationships/history/search`
const DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT = `${API_URL}/api/metadata/icd10codes/actions/search`
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
const METADATA_CODESET_ALL_ENDPOINT = `${API_URL}/api/metadata/codesets`
const GET_PROVIDER_SETTINGS_ENDPOINT = `${API_URL}/api/settings/actions/search`
const GET_STAFF_ENDPOINT = `${API_URL}/api/staff/search?includeInactive=true`
const GET_APPOINTMENT_COSIGNERS_ENDPOINT = (appointmentId: number) =>
  `${API_URL}/api/appointments/${appointmentId}?isIncludeCosigners=true`

const NOTE_MARK_ERROR_ENDPOINT = (
  appointmentId?: string,
  noteId?: string,
  patientId?: string,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/actions/markerror`

const GET_CLINICS_ENDPOINT = `${API_URL}/api/clinics`
const GET_PROVIDERS_ENDPOINT = `${API_URL}/api/staff/search`
const ADD_STAFF_ENDPOINT = `${API_URL}/api/staff`
const UPDATE_STAFF_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}`
const GET_VISIT_TYPE_ENDPOINT = `${API_URL}/api/encounters/actions/search`
const GET_PAYMENT_ADJUSTMENT_CODES = `${API_URL}/api/paymentadjustmentcodes/actions/search`
const GET_CLAIM_PAYMENTS = `${API_URL}/api/claimpayments/actions/search`
const GET_CLAIM_SERVICELINE_PAYMENTS = `${API_URL}/api/claimservicelinepayments/actions/search`
const GET_FACILITY_ADMISSION_IDS_ENDPOINT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/actions/facilityadmitids`
const GET_LAB_RESULTS_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/labresults/actions/search`
const GET_INSURANCE_PAYMENT_DETAIL_ENDPOINT = (paymentId: string) =>
  `${API_URL}/api/payments/${paymentId}`
const GET_PATIENT_RELATIONSHIPS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/relationships`
const GET_PATIENT_PREFERRED_PARTNERS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/preferredpartners`
const GET_STAFF_PROFILE_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}?isIncludePractice=false&isIncludeOrganization=true`
const DELETE_STAFF_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}`
const GET_INSURANCE_PAYERS_ENDPOINT = (includePlans: boolean) =>
  `${API_URL}/api/insurance/payers?includePlans=${includePlans}&includeInactive=false&includeTest=false&publicViewable=true&offset=0&limit=0`
const GET_INSURANCE_PAYER_PLANS = (payerId: string) =>
  `${API_URL}/api/insurance/payers/${payerId}?includePlans=true&includeInactive=false&includeTest=false&publicViewable=true`
const GET_USER_PERMISSIONS_ENDPOINT = `${API_URL}/api/users/self/organizations?includePermissions=true`
const SEARCH_LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const ADD_PROVIDER_LOCATION_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}/locations`
const GET_PROVIDER_LOCATIONS_ENDPOINT = `${API_URL}/api/providerlocations/actions/search`
const UPDATE_PROVIDER_LOCATION_STATUS_ENDPOINT = (
  staffId: string,
  locationId: string,
) => `${API_URL}/api/staff/${staffId}/locations/${locationId}`
const GET_STAFF_USER_ENDPOINT = (staffId: number) =>
  `${API_URL}/api/staff/${staffId}`
const PRESCRIBER_DIRECTORY_ENDPOINT = (staffId: string, locationId: string) =>
  `${API_URL}/api/providers/${staffId}/locations/${locationId}/directories`
const DISABLE_PRESCRIBER_DIRECTORY_ENDPOINT = (
  staffId: string,
  locationId: string,
) =>
  `${API_URL}/api/providers/${staffId}/locations/${locationId}/directories/actions/disable`
const GET_PROVIDER_LOCATION_HISTORY = `${API_URL}/api/providerlocations/actions/history/search`
const SEARCH_BOOKED_APPOINTMENTS_ENDPOINT = `${API_URL}/api/appointments/actions/search`
const GET_CLEARNING_HOUSE_RECEIVERS = `${API_URL}/api/clearinghousereceivers/actions/search`
const BOOK_APPOINTMENT = (patientId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/actions/book`
const UPDATE_APPOINTMENT = (patientId: number, appointmentId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}`
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
const ADD_LOCATION_ENDPOINT = `${API_URL}/api/locations`
const GET_LOCATION_HISTORY = (locationId: string) =>
  `${API_URL}/api/locations/${locationId}/history/actions/search?offset=0&limit=0&orderBy=createdOn`
const GET_US_STATES_ENDPOINT = `${API_URL}/api/countries/united states/states`
const GET_STATES_LOCATIONS_ENDPOINT = (stateId: string) =>
  `${API_URL}/api/clinics?stateId=${stateId}`
const SEARCH_INSURANCE_PLANS_ENDPOINT = `${API_URL}/api/insurance/plans/actions/search`
const GET_PATIENT_STAFF_COMMENTS_ENDPOINT = `${API_URL}/api/staffcomments/actions/search`
const DELETE_STAFF_COMMENT_ENDPOINT = (commentId: number) =>
  `${API_URL}/api/staffcomments/${commentId}`
const CREATE_STAFF_COMMENT_ENDPOINT = (appointmentId: number) =>
  `${API_URL}/api/appointments/${appointmentId}/staffcomments`
const ADD_STAFF_COMMENT_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/staffcomments`
const Update_STAFF_COMMENT_ENDPOINT = (commentId: number) =>
  `${API_URL}/api/staffcomments/${commentId}`
const GET_AVAILABLE_APPOINTMENT_ENDPOINT = `${API_URL}/api/schedules/availability/search`
const GET_SECURE_MESSAGES = `${API_URL}/api/users/self/securemessaging/messages/actions/search`
const GET_UNREAD_COUNT_SECURE_MESSAGES = `${API_URL}/api/users/self/securemessaging/messages/actions/unreadcount`
const GET_USER_EMR_DIRECT_STATUS_SECURE_MESSAGES = `${API_URL}/api/users/self/securemessaging/messages/validateemrdirect`
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
const SEARCH_MODAL_PHARMACIES = `${API_URL}/api/pharmacies/actions/search`
const SEARCH_PHARMACIES = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/actions/search`
const ADD_PHARMACY = (patientId: string, pharmacyId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/${pharmacyId}/actions/associate`
const ADD_FAVORITE_PHARMACY = (pharmacyId: string, patientId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/${pharmacyId}/actions/favorite`
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
const GET_PATIENT_FACESHEET = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/facesheets/actions/search`
const UPLOAD_PATIENT_FACESHEET = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/facesheets/actions/uploadimage`
const UPDATE_PATIENT_FACESHEET = (
  patientId: number,
  patientFaceSheetId: string,
) => `${API_URL}/api/patients/${patientId}/facesheets/${patientFaceSheetId}`
const GET_PATIENT_FACESHEET_IMAGE = (
  patientId: number,
  patientFaceSheetId: string,
) => `/api/patients/${patientId}/facesheets/${patientFaceSheetId}/images`
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
const UPDATE_LOCATION_ENDPOINT = (locationId: string) =>
  `${API_URL}/api/locations/${locationId}`
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
const DOWNLOAD_CLAIM_SUBMISSION_HISTORY_ENDPOINT = (submissionId: string) =>
  `${API_URL}/api/claimssubmissions/${submissionId}/actions/download`
const GET_PATIENT_STATEMENTS_LIST_ENDPOINT = `${API_URL}/api/billingstatements/actions/search`
const DOWNLOAD_HCFA_FILE_ENDPOINT = `${API_URL}/api/claimssubmissions/actions/previewclaimform`
const GET_RESPONSE_HISTORY_LIST_ENDPOINT = `${API_URL}/api/claimssubmissions/responses/actions/search`
const GET_RESPONSE_HISTORY_DETAIL_LIST_ENDPOINT = (id: string) =>
  `${API_URL}/api/claimssubmissions/responses/${id}/details/actions/search`
const GET_CLAIMS_AUDIT_HISTORY_LIST_ENDPOINT = `${API_URL}/api/claims/history`
const GET_PAYMENTS_HISTORY_LIST_ENDPOINT = (paymentId: string) =>
  `${API_URL}/api/payments/${paymentId}/history/actions/search`

const GET_CLAIMPAYMENTS_HISTORY_LIST_ENDPOINT = (claimPaymentId: string) =>
  `${API_URL}/api/claimpayments/${claimPaymentId}/history/actions/search`
const GET_CLAIMS_LIST_ENDPOINT = `${API_URL}/api/claims/actions/search`
const EXPORT_CLAIMS_LIST_ENDPOINT = (fileFormat: string) =>
  `${API_URL}/api/claims/actions/export/${fileFormat}`
const SETTINGS_HISTORY_ENDPOINT = `${API_URL}/api/settings/actions/history/search`
const EXPORT_SUBMISSIONS_LIST_ENDPOINT = (fileFormat: string) =>
  `${API_URL}/api/claimssubmissions/actions/export/${fileFormat}`
const EXPORT_PAYMENTS_LIST_ENDPOINT = (fileFormat: string) =>
  `${API_URL}/api/payments/actions/export/${fileFormat}`
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
const DELETE_CLAIM_PAYMENT = (claimPaymentId: string) =>
  `${API_URL}/api/claimpayments/${claimPaymentId}`
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
const GET_PATIENT_MEDICATIONS = () =>
  `${API_URL}/api/prescriptions/actions/search`
const NOTE_UPLOAD_FILE = (patientId: string, appointmentId: string | null) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents`
const GET_ORGANIZATION_ROLES = `${API_URL}/api/organizations/actions/search`
const GET_PATIENT_UNPAID_APPOINTMENTS_ENDPOINT = (
  patientId: string,
  paymentType: string,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/actions/unpaid/${paymentType}`
const GET_ORGANIZATIONS_ENDPOINT = `${API_URL}/api/organizations/actions/search`
const GET_ORGANIZATION_HX_STATUS_ENDPOINT = (organizationId: string) =>
  `${API_URL}/api/organizations/${organizationId}/history/actions/search`
const ADD_ORGANIZATION_PRACTICE_ENDPOINT = (organizationId: string) =>
  `${API_URL}/api/organizations/${organizationId}/practices`
const ADD_ORGANIZATION_ENDPOINT = `${API_URL}/api/organizations`
const UPDATE_ORGANIZATION_ENDPOINT = (organizationId: string) =>
  `${API_URL}/api/organizations/${organizationId}`
const GET_INSURANCE_PAYERS_LIST_ENDPOINT = `${API_URL}/api/insurance/plans/actions/search`
const IMPORT_ERA_ENDPOINT = `${API_URL}/api/receivers/responses/actions/claimeraimport`
const GET_PAYMENT_SERVICELINES_ENDPOINT = `${API_URL}/api/claimservicelinepayments/actions/search`
const GET_PRACTICES_ENDPOINT = `${API_URL}/api/practices/actions/search`
const GET_STAFF_ORGANIZATIONS_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/users/${staffId}/organizations?includeRecordMetadata=false`
const GET_PATIENT_VITALS_ENDPOINT = `${API_URL}/api/patientvitalsigns/actions/search`
const ADD_PATIENT_VITAL_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/vitalsigns`
const UPDATE_PATIENT_VITAL_ENDPOINT = (
  patientId: string,
  vitalSignId: string,
) => `${API_URL}/api/patients/${patientId}/vitalsigns/${vitalSignId}`
const GET_STAFF = `${API_URL}/api/staff?includeInactive=false&offset=0&limit=0&orderBy=legalName asc`
const GET_POS_CODES = `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/PlaceOfService?includeExtraDetails=false&offset=0&limit=100&orderBy=displayName asc`
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

const SEARCH_STAFF_ENDPOINT = `${API_URL}/api/staff/search`
const GET_SELF_STAFF_DETAILS_ENDPOINT = `${API_URL}/api/staff/self`
const GET_PATIENT_REFERRALS_ENDPOINT = `${API_URL}/api/referrals/search`
const GET_PATIENT_REFERRALS_HISTORY_ENDPOINT = (liveReferralId: string) =>
  `${API_URL}/api/referrals/${liveReferralId}/history/search`
const UPDATE_PATIENT_REFERRAL_ENDPOINT = (
  patientId: number,
  referralId: number,
) => `${API_URL}/api/patients/${patientId}/referrals/${referralId}`
const SIGN_PATIENT_REFERRAL_ENDPOINT = (
  patientId: number,
  referralId: number,
) => `${API_URL}/api/patients/${patientId}/referrals/${referralId}/actions/sign`
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
const GET_PHARMACIES = `${API_URL}/api/pharmacies/actions/search`
const PATIENT_CHARGE_PAYMENT_ENDPOINT = `${API_URL}/api/payments/actions/charge`

const UPDATE_PATIENT_RELATIONSHIP_ENDPOINT = (
  patientId: number,
  relationshipId: string,
) => `${API_URL}/api/patients/${patientId}/relationships/${relationshipId}`
const GET_PATIENT_SCHEDULING_HISTORY = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/schedulinghistory/actions/search`
const GET_PATIENT_FACILITY_HISTORY = (
  patientId: string,
  appointmentId: number,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/actions/facilityhistory`

const GET_PATIENT_SCHEDULING_STATUS_HISTORY = (
  patientId: string,
  appointmentId: number,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/actions/schedulestatushistory`

const GET_PATIENT_TRANSACTION_HISTORY = (
  patientId: string,
  appointmentId: number,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/transactions/actions/history`
const CREATE_NOTE_ENDPOINT = (
  patientId: string,
  appointmentId: string | null,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/secondarynotes`
const INBOX_SIGN_NOTE_ENDPOINT = (
  patientId: string,
  appointmentId: string,
  noteId: string,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/actions/sign`
const GET_NOTE_DOCUMENT_ENDPOINT = (
  patientId: string,
  appointmentId: string,
  documentId: string,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents/${documentId}/actions/download`
const GET_ALLERGIES_ENDPOINT = `${API_URL}/api/allergies/actions/search`
const PATIENT_CARE_TEAM_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/careteam`
const GET_STAFF_LICENSE = `${API_URL}/api/stafflicenses/actions/search`
const ADD_STAFF_LICENSE = (staffId: number) =>
  `${API_URL}/api/staff/${staffId}/licenses`
const UPDATE_STAFF_LICENSE = (staffId: number, staffLicenseId: string) =>
  `${API_URL}/api/staff/${staffId}/licenses/${staffLicenseId}`
const GET_STAFF_LICENSE_HISTORY_ENDPOINT = (staffLicenseId: string) =>
  `${API_URL}/api/stafflicenses/${staffLicenseId}/history/actions/search`
const GET_NEAR_TO_EXPIRE_STAFF_LICENSE_ENDPOINT = (
  staffId: number,
  lookForwardDays = 90,
) =>
  `${API_URL}/api/staff/${staffId}/licenses/actions/expirynotification/${lookForwardDays}`
const GET_LAB_ORDERS = (appointmentId: string) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/actions/search`
const GET_SCRIPT_SURE_SESSION_TOKEN = (partnerShortName: string) =>
  `${API_URL}/api/integration/partners/${partnerShortName}/actions/authtoken`
const GET_SCRIPT_SURE_EXTERNAL_PATIENT_ID = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/prescriptions/actions/externalpatient/search`

const GET_STAFF_BY_ID = (staffId: number) => `${API_URL}/api/staff/${staffId}`
const GET_PAYER_PLANS_LIST = `${API_URL}/api/insurance/plans/actions/search`
const ADD_PAYER_PLAN = (id: string) =>
  `${API_URL}/api/insurance/payers/${id}/insuranceplans`
const UPDATE_PAYER_PLAN = (payerId: string, insuranceid: string) =>
  `${API_URL}/api/insurance/payers/${payerId}/insuranceplans/${insuranceid}`
const GET_PAYERS = `${API_URL}/api/insurance/payers?includePlans=false&includeInactive=false&includeTest=false&publicViewable=true&offset=0&limit=0`
const ADD_PAYER = () => `${API_URL}/api/insurance/payers`
const PAYER_PLAN_BY_ID = (id: string) => `${API_URL}/api/insurance/plans/${id}`
const GET_PAYER_PLAN_ADDRESS = (insurancePlanId: string) =>
  `${API_URL}/api/insurance/insuranceplans/${insurancePlanId}/addresses`
const UPDATE_PAYER_PLAN_ADDRESS = (
  insurancePlanId: string,
  payerAddressId: string,
) =>
  `${API_URL}/api/insurance/insuranceplans/${insurancePlanId}/addresses/${payerAddressId}`
const ADD_PAYER_PLAN_ADDRESS = (insurancePlanId: string) =>
  `${API_URL}/api/insurance/insuranceplans/${insurancePlanId}/addresses`
const DELETE_PAYER_PLAN = (payerId: string, insurancePlanId: string) =>
  `${API_URL}/api/insurance/payers/${payerId}/insuranceplans/${insurancePlanId}`
const DELETE_PAYER_PLAN_ADDRESS = (
  insurancePlanId: string,
  payerAddressId: string,
) =>
  `${API_URL}/api/insurance/insuranceplans/${insurancePlanId}/addresses/${payerAddressId}`
const GET_DETAILED_NOTE_ENDPOINT = (patientId?: string) =>
  `${API_URL}/api/patients/${patientId}/detailednotes/actions/search`
const GET_NOTES_ENDPOINT = `${API_URL}/api/staff/self/notes/actions/search`
const GET_NOTE_VIEW_ENDPOINT = (
  patientId: string,
  appointmentId: string | null,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/actions/search`
const GET_NOTE_DOCUMENTS_ENDPOINT = (
  patientId: string,
  appointmentId: string | null,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents/actions/search`
const GET_STAFF_DEA_ENDPOINT = `${API_URL}/api/staffdea/actions/search`
const ADD_SCHEDULE_REPORT_ENDPOINT = `${API_URL}/api/reporting/schedules`
const RUN_SCHEDULE_REPORT_JOB_ENDPOINT = `${API_URL}/api/jobmanager/jobs`
const SAVE_ADDENDUMS_AGAINST_NOTE_ID = (
  patientId: string,
  appointmentId: string,
  noteId: string,
  isCoSigner: boolean,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/addendums?IsCoSigner=${isCoSigner}`
const SENT_TO_COSIGNER_NOTE_ENDPOINT = (
  patientId: string,
  appointmentId?: string,
  noteId?: string,
  staffId?: string,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/cosigners/${staffId}`

const REMOVE_TO_COSIGNER_NOTE_ENDPOINT = (
  patientId: string,
  appointmentId?: string,
  noteId?: string,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/cosigner`

const UPDATE_LAB_ORDERS_RESULT_ENDPOINT = (
  appointmentId: string,
  orderId: string,
  id: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labresults/${id}`
const LINK_PATIENT_ACCOUNT = (
  survivorPatientId: string,
  nonSurvivorPatientId: string,
) =>
  `${API_URL}/api/patients/${survivorPatientId}/links/${nonSurvivorPatientId}`
const GET_PATIENT_LINKS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/links`
const DELETE_PATIENT_LINKS = (linkedAccountId: string) =>
  `${API_URL}/api/patientlinks/${linkedAccountId}`

const GET_USER_TYPE = (userId: string) => `${API_URL}/api/users/${userId}/type`

const GET_FACILITY_ADMISSION_DATA = `${API_URL}/api/facilityadmissions/actions/search`

const ADD_LAB_ORDERS_RESULT_ENDPOINT = (
  appointmentId: string,
  orderId: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labresults`

const GET_TREATMENT_TEAM_VISITS = `${API_URL}/api/appointments/actions/search`

const GET_CLAIM_SUBMISSION_RESPONSE = (claimId: string) =>
  `${API_URL}/api/claimssubmissions/${claimId}/responses/actions/search`
const GET_SEARCHED_LAB_TESTS = `${API_URL}/api/labcompendiums/actions/search`
const GET_LABS_LOCATION = `${API_URL}/api/labs/actions/search`
const LAB_ORDER = (appointmentId: number) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders`
const ADD_LAB_DIAGNOSIS = `${API_URL}/api/labdiagnoses/actions/updaterange`
const ADD_LAB_TESTS = `${API_URL}/api/labtests/actions/updaterange`
const GET_PATIENT_DIAGNOSIS = (appointmentId: string, orderId: string) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labdiagnoses/actions/search`
const DELETE_LAB_TEST = (
  appointmentId: number | string,
  orderId: string,
  testId: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labtests/${testId}`
const DELETE_DIAGNOSIS = (
  appointmentId: number | string,
  orderId: string,
  dignosisId: number | string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labdiagnoses/${dignosisId}`
const ADD_LAB_TEST_SPECIMEN = (testId: number | string) =>
  `${API_URL}/api/labtests/${testId}/labspecimens`
const GET_LAB_TEST_SPECIMEN = (
  appointmentId: number | string,
  orderId: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labspecimens/actions/search`
const EDIT_DELETE_LAB_TEST_SPECIMEN = (
  appointmentId: number | string,
  orderId: string,
  specimenId: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labspecimens/${specimenId}`
const PLACE_LAB_ORDER = (orderId: string) =>
  `${API_URL}/api/laborders/${orderId}/actions/submit`
const UPLOAD_QUICK_NOTE_DOCUMENT = (patientId: number, appointmentId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents`
const GET_ALL_QUICK_NOTE_DOCUMENT = (
  patientId: number,
  appointmentId: number,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents/actions/search`
const DOWNLOAD_QUICK_NOTE_DOCUMENT = (
  patientId: number,
  appointmentId: number,
  documentId: string,
) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents/${documentId}/actions/download`
const DELETE_QUICK_NOTE_DOCUMENT = (patientId: number, appointmentId: number) =>
  `${API_URL}/api/patients/${patientId}/appointments/${appointmentId}/documents`
const DOWNLOAD_LAB_ORDER_DOCUMENT = (
  appointmentId: string,
  orderId: string,
  documentId: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/documents/${documentId}/actions/download`

const DELETE_LAB_ORDERS_RESULT_ENDPOINT = (
  appointmentId: string,
  orderId: string,
  id: string,
) =>
  `${API_URL}/api/appointments/${appointmentId}/laborders/${orderId}/labresults/${id}`

const LAB_ORDER_GET_REQUISITION = (orderId: string) =>
  `${API_URL}/api/laborders/${orderId}/actions/getrequisition`
const DELETE_PHARMACY = (pharmacyId: string, patientId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/${pharmacyId}`
const PRIORITY_PHARMACY = (pharmacyId: string, patientId: string) =>
  `${API_URL}/api/patients/${patientId}/pharmacies/${pharmacyId}/actions/default`
const GET_ORGANIZATION_PRACTICES_ENDPOINT = `${API_URL}/api/practices/actions/search`
const GET_STAFF_ORGANIZATION_PRACTICES_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/users/${staffId}/practices`
const UPDATE_PRACTICE_ENDPOINT = (organizationId: string, practiceId: string) =>
  `${API_URL}/api/organizations/${organizationId}/practices/${practiceId}`
const ATTACH_PRACTICE_STAFF_ENDPOINT = (staffId: string, practiceId: string) =>
  `${API_URL}/api/users/${staffId}/practices/${practiceId}/actions/associate`
const DETACH_PRACTICE_STAFF_ENDPOINT = (staffId: string, practiceId: string) =>
  `${API_URL}/api/users/${staffId}/practices/${practiceId}/actions/deassociate`
const GET_PRACTICE_HISTORY_ENDPOINT = (practiceId: string) =>
  `${API_URL}/api/practices/${practiceId}/history/actions/search`

const GET_ADDENDUMS_AGAINST_NOTE_ID = (
  patientId: string,
  appointmentId: string,
  noteId: string,
) =>
  `${API_URL}/api/patients/${patientId}/encounters/${appointmentId}/notes/${noteId}/addendums`
const GET_FORWARDING_MESSAGE_LIST_ENDPOINT = `${API_URL}/api/securemessaging/forwards/actions/search`
const UPDATE_FORWARDING_MESSAGE_ENDPOINT = (
  userId: number,
  messageId: string,
) => `${API_URL}/api/users/${userId}/securemessaging/forwards/${messageId}`
const DELETE_FORWARDING_MESSAGE_ENDPOINT = (
  userId: number,
  messageId: string,
) => `${API_URL}/api/users/${userId}/securemessaging/forwards/${messageId}`
const ADD_FORWARD_MESSAGE_ENDPOINT = (userId: number) =>
  `${API_URL}/api/users/${userId}/securemessaging/forwards`
const HISTORY_FORWARDING_MESSAGE_ENDPOINT = (
  userId: number,
  messageForwardingId: string,
) =>
  `${API_URL}/api/users/${userId}/securemessaging/forwards/${messageForwardingId}/history/actions/search`
const UPDATE_PATIENT_PRESCRIPTIONS_MEDICATIONS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/prescriptions/actions/updatestatus`
const GET_ASSIGNING_AUTHORITIES_WITH_OPTIONAL_CODSET_CODES = `${API_URL}/api/codeset/actions/search`
const GET_CODSET_CODES = (assigningAuthorityId: string, codesetId: string) =>
  `${API_URL}/api/codeset/assigningauthorities/${assigningAuthorityId}/codesets/${codesetId}/codes/actions/search`
const UPDATE_CODSET_CODE = (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}`
const ADD_ASSIGNING_AUTHORITY = `${API_URL}/api/codeset/authorities`
const ADD_CODSET_CODE = (assigningAuthorityId: string, codesetId: string) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes`
const CANCEL_PATIENT_PRESCRIPTIONS = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/scriptsureprescriptions/actions/cancel`

const GET_PATIENT_PRESCRIPTIONS_MEDICATION_ORDER = (
  patientId: string,
  prescriptionId: string,
) =>
  `${API_URL}/api/patients/${patientId}/prescriptions/${prescriptionId}/order`
const GET_ACS_INFO = `${API_URL}/api/staff/self/communications/actions/accesstoken`

const ADD_CLAIM_NOTES = (claimId: string) =>
  `${API_URL}/api/claims/${claimId}/notes`
const UPDATE_CLAIM_NOTES = (claimId: string, notesId: string) =>
  `${API_URL}/api/claims/${claimId}/notes/${notesId}`
const GET_CLAIM_NOTES_LIST = `${API_URL}/api/claimnotes/actions/search`
const DELETE_CLAIM_NOTES = (noteId: string, claimId: string) =>
  `${API_URL}/api/claims/${claimId}/notes/${noteId}`
const GET_CLAIMS_CLAIM_NOTES_HISTORY = `${API_URL}/api/claimnotes/actions/history/search`
const DOWNLOAD_LIST_VIEW_DATA = `${API_URL}/api/appointments/actions/download`

const ADD_CODSET = (assigningAuthorityId: string) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthorityId}/codesets`
const ADD_CODSET_CODE_ATTRIBUTES = (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}/attributes`

const UPDATE_CODSET_CODE_ATTRIBUTES = (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
  attributeId: string,
) =>
  `${API_URL}/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}/attributes/${attributeId}`

const GET_SELF_USER_SETTINGS = `${API_URL}/api/users/self/settings`

const ADD_SELF_USER_SETTINGS = `${API_URL}/api/users/self/settings`

const UPDATE_SELF_USER_SETTINGS = (settingId: string) =>
  `${API_URL}/api/users/self/settings/${settingId}`

const SELF_USER_BULK_SETTINGS = `${API_URL}/api/users/self/bulksettings`
const GET_LOCATION_SERVICES_ENDPOINT = `${API_URL}/api/locationservices/actions/search`
const DELETE_SERVICES_ENDPOINT = (locationId: string, serviceId: string) =>
  `${API_URL}/api/locations/${locationId}/services/${serviceId}`
const UPDATE_SERVICE_ENDPOINT = (locationId: string, serviceId: string) =>
  `${API_URL}/api/locations/${locationId}/services/${serviceId}`

const GET_SERVICE_HISTORY = (serviceId: string) =>
  `${API_URL}/api/services/${serviceId}/history/actions/search`
const GET_CURRENT_USER_SETTINGS = `${API_URL}/api/users/self/settings`
const ADD_BULK_USER_SETTINGS = (userId: number) =>
  `${API_URL}/api/users/${userId}/bulksettings`
const UPDATE_BULK_USER_SETTINGS = (userId: number) =>
  `${API_URL}/api/users/${userId}/bulksettings`
const GET_LAB_ORDER_RESULTS = `${API_URL}/api/laborders/actions/search`
const ADD_SIGNED_LAB_ORDERS = `${API_URL}/api/laborders/actions/signed`
const ADD_CLAIM = `${API_URL}/api/claims`
const SELF_PRACTICES = `${API_URL}/api/users/self/practices?includePermissions=false`
const GET_CURRENT_USER_SETTINGS_SEARCH = `${API_URL}/api/users/self/settings/actions/search`
const GET_DISTRIBUTION_GROUPS = `${API_URL}/api/usergroups/action/search`

const ELECTRONICALLY_SIGN_POLICY_ENDPOINT = (patientId: string) =>
  `${API_URL}/api/patients/${patientId}/consents`
const GET_REFILL_REQUESTS = `${API_URL}/api/pharmacyNotifications/actions/search`

const GET_SHARED_POLICY_FILE = (fileName: string) =>
  `${API_URL}/SharedContent/documents/${fileName}.html`
const DELETE_STAFF_VIDEO_ENDPOINT = (staffId: string) =>
  `${API_URL}/api/staff/${staffId}/biovideo`

const UPDATE_FOLLOW_UP_DENIAL_STATUS = (appointmentId: number) =>
  `${API_URL}/api/appointments/${appointmentId}/actions/followupstatus`

const GET_USERS_SELF_INITIAL_INFORMATION_ENDPOINT = `${API_URL}/api/users/self/initialinformation`

export {
  GET_LAB_RESULTS_ENDPOINT,
  NOTE_UPLOAD_FILE,
  GET_NOTE_VIEW_ENDPOINT,
  ADD_USER_SETTINGS,
  UPDATE_USER_SETTINGS,
  GET_CLAIM_PAYMENTS,
  GET_CLAIM_SERVICELINE_PAYMENTS,
  USER_ENDPOINT,
  GET_PAYMENT_ADJUSTMENT_CODES,
  GET_STAFF_PROFILE_ENDPOINT,
  DELETE_STAFF_ENDPOINT,
  REFRESH_ENDPOINT,
  GET_CLAIM_SUBMISSION_LIST,
  GET_CLAIMPAYMENTS_HISTORY_LIST_ENDPOINT,
  GET_PAYMENTS_HISTORY_LIST_ENDPOINT,
  IMPORT_ERA_ENDPOINT,
  ADD_CLAIM_PAYMENT,
  GET_FEATURE_FLAG_ENDPOINT,
  PRESCRIBER_DIRECTORY_ENDPOINT,
  DISABLE_PRESCRIBER_DIRECTORY_ENDPOINT,
  EXPORT_CLAIMS_LIST_ENDPOINT,
  EXPORT_PAYMENTS_LIST_ENDPOINT,
  ADD_PROVIDER_LOCATION_ENDPOINT,
  GET_PROVIDER_LOCATIONS_ENDPOINT,
  EXPORT_SUBMISSIONS_LIST_ENDPOINT,
  UPDATE_PROVIDER_LOCATION_STATUS_ENDPOINT,
  GET_PROVIDER_LOCATION_HISTORY,
  ADD_SERVICE_ENDPOINT,
  UPDATE_CLAIM_PAYMENT,
  ADD_MASTER_FEE_SCHEDULE_ENDPOINT,
  GET_STAFF_VACATION_ENDPOINT,
  GET_STAFF_VACATION_HISTORY_ENDPOINT,
  UPDATE_STAFF_VACATION_ENDPOINT,
  MASTER_FEE_SCHEDULE_ENDPOINT,
  GET_CLEARNING_HOUSE_RECEIVERS,
  SESSION_ENDPOINT,
  LOGIN_ENDPOINT,
  SEARCH_PATIENTS_ENDPOINT,
  CLINIC_LOCATIONS_ENDPOINT,
  FACILITY_ADMISSION_ID_ENDPOINT,
  LOCATION_SERVICES_ENDPOINT,
  DELETE_CLAIM_PAYMENT,
  LOCATION_ENDPOINT,
  VISIT_TYPES_ENDPOINT,
  FEATURE_FLAGS,
  STATES_BY_COUNTRY_ENDPOINT,
  ADD_VACATION,
  EDIT_VACATION_ENDPOINT,
  GET_PATIENT_NOTIFICATIONS_ENDPOINT,
  SENT_TO_COSIGNER_NOTE_ENDPOINT,
  PATIENT_PROFILE_ENDPOINT,
  NOTE_DETAILS_SEARCH_ENDPOINT,
  NOTE_DETAILS_HISTORY_ENDPOINT,
  ADD_ON_DRUGS_SEARCH_ENDPOINT,
  NOTE_DETAILS_SAVE_ENDPOINT,
  GET_PATIENT_PROFILE_ENDPOINT,
  GET_PATIENT_CONSENTS_ENDPOINT,
  SEND_POLICY_NOTICE_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
  METADATA_CODESET_ENDPOINT,
  GET_PROVIDER_SETTINGS_ENDPOINT,
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
  BOOK_APPOINTMENT,
  UPDATE_APPOINTMENT,
  ADD_PATIENT_ENDPOINT,
  ADD_LOCATION_ENDPOINT,
  GET_LOCATION_HISTORY,
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
  GET_UNREAD_COUNT_SECURE_MESSAGES,
  GET_USER_EMR_DIRECT_STATUS_SECURE_MESSAGES,
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
  GET_PATIENT_FACESHEET,
  UPLOAD_PATIENT_FACESHEET,
  UPDATE_PATIENT_FACESHEET,
  GET_PATIENT_FACESHEET_IMAGE,
  SET_PRIMARY_PATIENT_CREDIT_CARD,
  DELETE_PATIENT_CREDIT_CARD,
  ADD_PATIENT_CREDIT_CARD,
  GET_CLAIMS_LIST_ENDPOINT,
  GET_PAYMENT_SERVICELINES_ENDPOINT,
  GET_CLAIM_SUBMISSION_HISTORY,
  DELETE_CLAIM_ENDPOINT,
  GET_PATIENT_POLICIES,
  ADD_PATIENT_POLICY_ENDPOINT,
  UPDATE_PATIENT_POLICY_ENDPOINT,
  UPDATE_LOCATION_ENDPOINT,
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
  SETTINGS_HISTORY_ENDPOINT,
  GET_SELF_STAFF_DETAILS_ENDPOINT,
  UPDATE_PATIENT_REFERRAL_ENDPOINT,
  GET_APPOINTMENT,
  GET_PATIENT_MEDICATIONS,
  CREATE_PATIENT_REFERRAL_ENDPOINT,
  GET_INSURANCE_PAYERS_LIST_ENDPOINT,
  SEARCH_FAVOURITE_DIAGNOSIS_ENDPOINT,
  FAVOURITE_DIAGNOSIS_ENDPOINT,
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
  GET_PATIENT_SCHEDULING_HISTORY,
  GET_PATIENT_FACILITY_HISTORY,
  GET_PATIENT_SCHEDULING_STATUS_HISTORY,
  GET_PATIENT_TRANSACTION_HISTORY,
  GET_PHARMACIES,
  DELETE_PATIENT_APPOINTMENT_ENDPOINT,
  GET_ALLERGIES_ENDPOINT,
  PATIENT_CARE_TEAM_ENDPOINT,
  PATIENT_CHARGE_PAYMENT_ENDPOINT,
  GET_CLAIMS_AUDIT_HISTORY_LIST_ENDPOINT,
  NOTE_SIGN_ENDPOINT,
  GET_STAFF_LICENSE,
  ADD_STAFF_LICENSE,
  UPDATE_STAFF_LICENSE,
  GET_STAFF_BY_ID,
  GET_STAFF_LICENSE_HISTORY_ENDPOINT,
  GET_NEAR_TO_EXPIRE_STAFF_LICENSE_ENDPOINT,
  GET_LAB_ORDERS,
  GET_CPT_CODES,
  DIAGNOSIS_SEARCH_ICD10CODES_ENDPOINT,
  DOWNLOAD_HCFA_FILE_ENDPOINT,
  GET_SCRIPT_SURE_SESSION_TOKEN,
  GET_SCRIPT_SURE_EXTERNAL_PATIENT_ID,
  GET_PAYER_PLANS_LIST,
  ADD_PAYER_PLAN,
  UPDATE_PAYER_PLAN,
  GET_PAYERS,
  ADD_PAYER,
  PAYER_PLAN_BY_ID,
  GET_PAYER_PLAN_ADDRESS,
  UPDATE_PAYER_PLAN_ADDRESS,
  ADD_PAYER_PLAN_ADDRESS,
  DELETE_PAYER_PLAN,
  DELETE_PAYER_PLAN_ADDRESS,
  GET_DETAILED_NOTE_ENDPOINT,
  ADD_SCHEDULE_REPORT_ENDPOINT,
  RUN_SCHEDULE_REPORT_JOB_ENDPOINT,
  SAVE_ADDENDUMS_AGAINST_NOTE_ID,
  CREATE_NOTE_ENDPOINT,
  GET_APPOINTMENT_COSIGNERS_ENDPOINT,
  NOTE_MARK_ERROR_ENDPOINT,
  UPDATE_LAB_ORDERS_RESULT_ENDPOINT,
  DOWNLOAD_CLAIM_SUBMISSION_HISTORY_ENDPOINT,
  LINK_PATIENT_ACCOUNT,
  GET_PATIENT_LINKS,
  DELETE_PATIENT_LINKS,
  ADD_LAB_ORDERS_RESULT_ENDPOINT,
  GET_TREATMENT_TEAM_VISITS,
  ADD_ORGANIZATION_ENDPOINT,
  UPDATE_ORGANIZATION_ENDPOINT,
  GET_ORGANIZATION_HX_STATUS_ENDPOINT,
  GET_NOTE_DOCUMENTS_ENDPOINT,
  GET_STAFF_USER_ENDPOINT,
  GET_NOTE_DOCUMENT_ENDPOINT,
  GET_USER_TYPE,
  GET_FACILITY_ADMISSION_DATA,
  GET_CLAIM_SUBMISSION_RESPONSE,
  REMOVE_TO_COSIGNER_NOTE_ENDPOINT,
  GET_SEARCHED_LAB_TESTS,
  GET_LABS_LOCATION,
  LAB_ORDER,
  ADD_LAB_DIAGNOSIS,
  ADD_LAB_TESTS,
  GET_PATIENT_DIAGNOSIS,
  DELETE_LAB_TEST,
  DELETE_DIAGNOSIS,
  ADD_LAB_TEST_SPECIMEN,
  GET_LAB_TEST_SPECIMEN,
  EDIT_DELETE_LAB_TEST_SPECIMEN,
  PLACE_LAB_ORDER,
  UPLOAD_QUICK_NOTE_DOCUMENT,
  GET_ALL_QUICK_NOTE_DOCUMENT,
  DOWNLOAD_QUICK_NOTE_DOCUMENT,
  DELETE_QUICK_NOTE_DOCUMENT,
  ADD_STAFF_ENDPOINT,
  UPDATE_STAFF_ENDPOINT,
  ADD_ORGANIZATION_PRACTICE_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  DOWNLOAD_LAB_ORDER_DOCUMENT,
  DELETE_LAB_ORDERS_RESULT_ENDPOINT,
  LAB_ORDER_GET_REQUISITION,
  METADATA_CODESET_ALL_ENDPOINT,
  SEARCH_MODAL_PHARMACIES,
  ADD_PHARMACY,
  ADD_FAVORITE_PHARMACY,
  DELETE_PHARMACY,
  PRIORITY_PHARMACY,
  GET_ORGANIZATION_PRACTICES_ENDPOINT,
  UPDATE_PRACTICE_ENDPOINT,
  GET_PRACTICE_HISTORY_ENDPOINT,
  GET_ADDENDUMS_AGAINST_NOTE_ID,
  GET_FORWARDING_MESSAGE_LIST_ENDPOINT,
  UPDATE_FORWARDING_MESSAGE_ENDPOINT,
  DELETE_FORWARDING_MESSAGE_ENDPOINT,
  HISTORY_FORWARDING_MESSAGE_ENDPOINT,
  ADD_FORWARD_MESSAGE_ENDPOINT,
  GET_ASSIGNING_AUTHORITIES_WITH_OPTIONAL_CODSET_CODES,
  GET_CODSET_CODES,
  UPDATE_CODSET_CODE,
  ADD_ASSIGNING_AUTHORITY,
  ADD_CODSET_CODE,
  UPDATE_PATIENT_PRESCRIPTIONS_MEDICATIONS,
  GET_PATIENT_PRESCRIPTIONS_MEDICATION_ORDER,
  CANCEL_PATIENT_PRESCRIPTIONS,
  GET_ACS_INFO,
  ADD_CLAIM_NOTES,
  UPDATE_CLAIM_NOTES,
  GET_CLAIM_NOTES_LIST,
  DELETE_CLAIM_NOTES,
  GET_CLAIMS_CLAIM_NOTES_HISTORY,
  DOWNLOAD_LIST_VIEW_DATA,
  ADD_CODSET,
  ADD_CODSET_CODE_ATTRIBUTES,
  UPDATE_CODSET_CODE_ATTRIBUTES,
  GET_SELF_USER_SETTINGS,
  ADD_SELF_USER_SETTINGS,
  UPDATE_SELF_USER_SETTINGS,
  SELF_USER_BULK_SETTINGS,
  GET_STAFF_ORGANIZATION_PRACTICES_ENDPOINT,
  ATTACH_PRACTICE_STAFF_ENDPOINT,
  DETACH_PRACTICE_STAFF_ENDPOINT,
  ADD_BULK_USER_SETTINGS,
  UPDATE_BULK_USER_SETTINGS,
  UPDATE_FOLLOW_UP_DENIAL_STATUS,
  GET_LOCATION_SERVICES_ENDPOINT,
  DELETE_SERVICES_ENDPOINT,
  UPDATE_SERVICE_ENDPOINT,
  GET_SERVICE_HISTORY,
  ELECTRONICALLY_SIGN_POLICY_ENDPOINT,
  GET_NOTES_ENDPOINT,
  INBOX_SIGN_NOTE_ENDPOINT,
  GET_FEATURE_FLAGS_BY_SHORTNAME_ENDPOINT,
  GET_CURRENT_USER_SETTINGS,
  ADD_CLAIM,
  SELF_PRACTICES,
  GET_SHARED_POLICY_FILE,
  GET_CURRENT_USER_SETTINGS_SEARCH,
  ADD_STAFF_COMMENT_ENDPOINT,
  GET_REFILL_REQUESTS,
  GET_LAB_ORDER_RESULTS,
  ADD_SIGNED_LAB_ORDERS,
  GET_USERS_SELF_INITIAL_INFORMATION_ENDPOINT,
  GET_DISTRIBUTION_GROUPS,
  DELETE_STAFF_VIDEO_ENDPOINT,
  SIGN_PATIENT_REFERRAL_ENDPOINT,
  GET_STAFF_ORGANIZATIONS_ENDPOINT,
}
