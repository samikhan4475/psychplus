import { VisitStatusCodes } from "../types/schedule"

const ROUNDING_FILTERS = [
  'Provider Type',
  'Unit',
  'Room',
  'Group',
  'Primary Insurance',
  'Secondary Insurance',
  'Visit Type',
  'Visit Sequence',
  'Visit Medium',
  'Visit Status',
  'Ins Verification',
  'Diagnosis',
  'CPT Code',
  'DOA',
  'LOS',
  'LCD',
  'Legal',
  'Co-Pay',
  'Co-Ins',
  'Balance',
  'Note Signed',
]

const LIST_VIEW_FILTERS = [
  'Location',
  'Service',
  'Unit',
  'Room',
  'Group',
  'Provider Type',
  'Provider',
  'Visit Type',
  'Visit Sequence',
  'Visit Medium',
  'Visit Status',
  'Ins Verification',
  'Primary Insurance',
  'Secondary Insurance',
  'Co-Pay',
  'Co-Ins',
  'Balance',
  'DOA',
  'LOS',
  'LCD',
  'Authorization Number',
  'Legal',
  'Note Signed',
]

const ROUNDING_FILTERS_KEY = 'rounding-filters'

const NOTE_SIGNED: Record<string, boolean> = {
  'yes': true,
  'no': false,
}

const PROVIDER_CODING_FILTERS = [
  'Provider Type',
  'Unit',
  'Room',
  'Group',
  'Primary Insurance',
  'Secondary Insurance',
  'Visit Type',
  'Visit Sequence',
  'Visit Medium',
  'Visit Status',
  'Ins Verification',
  'Diagnosis',
  'CPT Code',
  'DOA',
  'LOS',
  'LCD',
  'Legal',
  'Co-Pay',
  'Co-Ins',
  'Balance',
  'Note Signed',
  'Facility Admission Id',
]

// setting locale where start of the week is monday
const START_OF_WEEK_LOCALE = 'fr-FR'

const INITIAL_VISIT_STATUS: string[] = [
  VisitStatusCodes.Seen,
  VisitStatusCodes.SeenByOther,
  VisitStatusCodes.Absent,
  VisitStatusCodes.Error,
  VisitStatusCodes.Unseen,
]

const INITIAL_DISCHARGE_VISIT_STATUS: string[] = [
  VisitStatusCodes.Seen,
  VisitStatusCodes.Absent,
  VisitStatusCodes.Error,
  VisitStatusCodes.Unseen,
]

const SUBSEQUENT_VISIT_STATUS: string[] = [
  ...INITIAL_VISIT_STATUS,
  VisitStatusCodes.TransferToOther,
]

const CHANGE_UNIT_PERMISSION = 'You do not have permission to change unit. Please contact your supervisor if you need any further assistance.'

const CHANGE_GROUP_PERMISSION = 'You do not have permission to change group. Please contact your supervisor if you need any further assistance.'

const CHANGE_ROOM_PERMISSION = 'You do not have permission to change group. Please contact your supervisor if you need any further assistance.'

const CHANGE_LEGAL_STATUS = 'You do not have permission to change legal status. Please contact your supervisor if you need any further assistance.'

const CHANGE_NON_TIMED_SEQUENCE = 'You do not have permission to change visit sequence for non-time dependent service. Please contact your supervisor if you need any further assistance.'

const CHANGE_NON_TIMED_MEDIUM = 'You do not have permission to change visit medium for non-timed service. Please contact your supervisor if you need any further assistance.'

const CLICK_PLUS_BUTTON_CALENDAR = 'You do not have permission to add visit from calendar view. Please contact your supervisor if you need any further assistance.'

const CLICK_DOWNLOAD_OR_PRINT_BUTTON = 'You do not have permission to click on download or print button. Please contact your supervisor if you need any further assistance.'

const EDIT_APPOINTMENT = 'You do not have permission to edit an appointment. Please contact your supervisor if you need any further assistance.'

const CLICK_DOLLAR_ICON = 'You do not have permission to view payment details. Please contact your supervisor if you need any further assistance.'

const SCHEDULER_PAGE_SIZE_LIMIT = 20


enum StatusCode {
  NoPermission = 406,
  OverridePermission = 428,
  ProceedConfirmation = 412,
}

export {
  ROUNDING_FILTERS,
  ROUNDING_FILTERS_KEY,
  PROVIDER_CODING_FILTERS,
  LIST_VIEW_FILTERS,
  NOTE_SIGNED,
  START_OF_WEEK_LOCALE,
  INITIAL_VISIT_STATUS,
  INITIAL_DISCHARGE_VISIT_STATUS,
  SUBSEQUENT_VISIT_STATUS,
  CHANGE_UNIT_PERMISSION,
  CHANGE_GROUP_PERMISSION,
  CHANGE_LEGAL_STATUS,
  CHANGE_NON_TIMED_SEQUENCE,
  CHANGE_NON_TIMED_MEDIUM,
  CHANGE_ROOM_PERMISSION,
  SCHEDULER_PAGE_SIZE_LIMIT,
  CLICK_PLUS_BUTTON_CALENDAR,
  CLICK_DOWNLOAD_OR_PRINT_BUTTON,
  EDIT_APPOINTMENT,
  CLICK_DOLLAR_ICON,
  StatusCode,
}
