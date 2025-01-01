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
const EDIT_ADMITTING_PROVIDER =
  'You do not have permission edit Admitting Provider. Please contact your supervisor if you need any further assistance.'
const EDIT_DATE_TIME_OF_ADMISSION =
  'You do not have permission edit Date/Time of Admission. Please contact your supervisor if you need any further assistance.'
const CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING =
  'No permission to change staff comment subsection to billing.'
const ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP =
  'You do not have permission to Add or Delete Staff Comments. Please contact your supervisor if you need any further assistance.'

export {
  TCM,
  TCMTypeOfVisit,
  SAVE_APPOINTMENT,
  ADD_VACATION,
  EDIT_ADMITTING_PROVIDER,
  EDIT_DATE_TIME_OF_ADMISSION,
  CHANGE_STAFF_COMMENT_SUBSECTION_TO_BILLING,
  ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP,
}
