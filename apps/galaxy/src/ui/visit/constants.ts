import { TCMVisitTypes } from './types'

const TCM = [
  TCMVisitTypes.NEW_PT_TRANSITIONAL_CARE,
  TCMVisitTypes.EST_PT_TRANSITIONAL_CARE,
  TCMVisitTypes.T_NEW_PT_TRANSITIONAL_CARE,
  TCMVisitTypes.T_EST_PT_TRANSITIONAL_CARE,
]

const TCMTypeOfVisit = 'Transitional Care Management'

const ADD_VACATION =
  'You do not have permission to Add Vacation. Please contact your supervisor if you need any further assistance.'
const SAVE_APPOINTMENT =
  'You do not have permission to Save. Please contact your supervisor if you need any further assistance.'
const OVERRIDE_SELF_SCHEDULE_PREFERENCE =
  'You do not have permission to override your own scheduling settings for timed visit. Please contact your supervisor if you need any further assistance.'
const OVERRIDE_OTHER_PROVIDER_SCHEDULE_PREFERENCE =
  "You do not have permission to override another provider's clinic schedule settings for timed visits. Please contact your supervisor if you need any further assistance."
const ADMIT_DATE_30_DAYS_PRIOR_POLICY =
  'You do not have permission to add the Admit Date/Time up to 30 days prior (from the current date) when the visit sequence is Initial. Please contact your supervisor if you need any further assistance.'
const EDIT_ADMITTING_PROVIDER =
  'You do not have permission edit Admitting Provider. Please contact your supervisor if you need any further assistance.'
const EDIT_DURATION =
  'You do not have permission edit Duration. Please contact your supervisor if you need any further assistance.'
const EDIT_DATE_TIME_OF_ADMISSION =
  'You do not have permission edit Date/Time of Admission. Please contact your supervisor if you need any further assistance.'
const CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING =
  'No permission to change staff comment subsection to billing.'
const ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP =
  'You do not have permission to Add or Delete Staff Comments. Please contact your supervisor if you need any further assistance.'

const DC_DATE_VALIDATION_ALERT_MESSAGE =
  'Discharge date can NOT be more than 14 days from the current date, please adjust the date to proceed'
const PRIMARY_PROVIDER_ALERT_MESSAGE =
  'would you like to update the patients primary provider'
export {
  TCM,
  TCMTypeOfVisit,
  SAVE_APPOINTMENT,
  OVERRIDE_SELF_SCHEDULE_PREFERENCE,
  OVERRIDE_OTHER_PROVIDER_SCHEDULE_PREFERENCE,
  ADMIT_DATE_30_DAYS_PRIOR_POLICY,
  ADD_VACATION,
  EDIT_ADMITTING_PROVIDER,
  EDIT_DURATION,
  EDIT_DATE_TIME_OF_ADMISSION,
  CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING,
  ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP,
  DC_DATE_VALIDATION_ALERT_MESSAGE,
  PRIMARY_PROVIDER_ALERT_MESSAGE,
}
