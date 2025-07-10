import { ProviderType } from '@/ui/visit/types'
import { VisitStatusCodes } from '../types/schedule'

const DAY_PATTERN = /Mon|Tue|Wed|Thu|Fri|Sat|Sun/i

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

const CALENDAR_VIEW_FILTERS = [
  'Location',
  'Service',
  'Unit',
  'Room',
  'Group',
  'Provider Type',
  'Provider',
  'Visit Type',
  'Visit Medium',
]

const ALWAYS_VISIBLE_COLUMNS = [
  'plus-actions-column',
  'patient-name',
  'age',
  'gender',
  'date-of-birth',
]

const LIST_VIEW_COLUMNS = [
  'appointment-date',
  'time',
  'duration',
  'service',
  'patient-status',
  'verify',
  'state',
  'location',
  'provider-type',
  'provider',
  'primary-insurance',
  'secondary-insurance',
  'visit',
  'co-payment',
  'co-insurance',
  'balance',
  'unit',
  'room',
  'appointment-group',
  'date-of-admission',
  'length-of-stay',
  'last-coverage-date',
  'authorization-number',
  'legal-status',
  'note-signed',
  'actions-column',
]
const PROVIDER_CODING_VIEW_COLUMNS = [
  'facility-admission-id',
  'location',
  'service',
  'provider-type',
  'unit',
  'room',
  'appointment-group',
  'primary-insurance',
  'date-of-admission',
  'length-of-stay',
  'last-coverage-date',
  'authorization-number',
  'legal-status',
]

const PROVIDER_CODING_VIEW_COLUMNS_KEY = {
  'facility-admission-id': 'Facility Admission ID',
  'appointment-date': 'Visit Date',
  'time-header': 'Time',
  'patient-status': 'User Status',
  location: 'Location',
  service: 'Service',
  'provider-type': 'Provider Type',
  unit: 'Unit',
  room: 'Room',
  'appointment-group': 'Group',
  'primary-insurance': 'Primary Insurance',
  'secondary-insurance': 'Secondary Insurance',
  visit: 'Visit',
  diagnosis: 'Diagnosis',
  'cpt-code': 'CPT Codes',
  'date-of-admission': 'DOA',
  'length-of-stay': 'LOS',
  'last-coverage-date': 'LCD',
  'authorization-number': 'Auth #',
  'legal-status': 'Legal',
  'co-payment': 'Co-Pay',
  'co-insurance': 'Co-Ins',
  balance: 'Balance',
  'note-signed': 'Note Signed Status',
  'actions-column': 'Actions',
}

const ROUNDING_VIEW_COLUMNS = [
  'appointment-date',
  'time-header',
  'patient-status',
  'location',
  'service',
  'provider-type',
  'unit',
  'room',
  'appointment-group',
  'primary-insurance',
  'secondary-insurance',
  'visit',
  'diagnosis',
  'cpt-code',
  'date-of-admission',
  'length-of-stay',
  'last-coverage-date',
  'authorization-number',
  'legal-status',
  'co-payment',
  'co-insurance',
  'balance',
  'note-signed',
  'actions-column',
]
const ROUNDING_VIEW_COLUMNS_KEY = {
  'appointment-date': 'Visit Date',
  'time-header': 'Time',
  'patient-status': 'User Status',
  location: 'Location',
  service: 'Service',
  'provider-type': 'Provider Type',
  unit: 'Unit',
  room: 'Room',
  'appointment-group': 'Group',
  'primary-insurance': 'Primary Insurance',
  'secondary-insurance': 'Secondary Insurance',
  visit: 'Visit',
  diagnosis: 'Diagnosis',
  'cpt-code': 'CPT Codes',
  'date-of-admission': 'DOA',
  'length-of-stay': 'LOS',
  'last-coverage-date': 'LCD',
  'authorization-number': 'Auth #',
  'legal-status': 'Legal',
  'co-payment': 'Co-Pay',
  'co-insurance': 'Co-Ins',
  balance: 'Balance',
  'note-signed': 'Note Signed Status',
  'actions-column': 'Actions',
}

const LIST_VIEW_COLUMNS_KEY = {
  'appointment-date': 'Visit Date',
  time: 'Time',
  duration: 'Duration',
  service: 'Service',
  'patient-status': 'User Status',
  verify: 'Verify',
  state: 'State',
  location: 'Location',
  'provider-type': 'Provider Type',
  provider: 'Provider',
  'primary-insurance': 'Primary Insurance',
  'secondary-insurance': 'Secondary Insurance',
  visit: 'Visit',
  'co-payment': 'Co-pay',
  'co-insurance': 'Co-Ins',
  balance: 'Balance',
  unit: 'Unit',
  room: 'Room',
  'appointment-group': 'Group',
  'date-of-admission': 'DOA',
  'length-of-stay': 'LOS',
  'last-coverage-date': 'LCD',
  'authorization-number': 'AUTH #',
  'legal-status': 'Legal',
  'note-signed': 'Note Signed Status',
  'actions-column': 'Actions',
}
const NOTE_SIGNED: Record<string, boolean> = {
  yes: true,
  no: false,
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
  VisitStatusCodes.SeenDcByPrimary,
  VisitStatusCodes.SeenByOther,
  VisitStatusCodes.Absent,
  VisitStatusCodes.Error,
  VisitStatusCodes.Unseen,
  VisitStatusCodes.UnseenDcByPrimary,
]

const INITIAL_DISCHARGE_VISIT_STATUS: string[] = [
  VisitStatusCodes.Seen,
  VisitStatusCodes.SeenDcByPrimary,
  VisitStatusCodes.Absent,
  VisitStatusCodes.Error,
  VisitStatusCodes.Unseen,
  VisitStatusCodes.UnseenDcByPrimary,
]

const SUBSEQUENT_VISIT_STATUS: string[] = [
  ...INITIAL_VISIT_STATUS,
  VisitStatusCodes.TransferToOther,
]

const CHANGE_UNIT_PERMISSION =
  'You do not have permission to change unit. Please contact your supervisor if you need any further assistance.'

const CHANGE_GROUP_PERMISSION =
  'You do not have permission to change group. Please contact your supervisor if you need any further assistance.'

const CHANGE_ROOM_PERMISSION =
  'You do not have permission to change group. Please contact your supervisor if you need any further assistance.'

const CHANGE_LEGAL_STATUS =
  'You do not have permission to change legal status. Please contact your supervisor if you need any further assistance.'

const CHANGE_NON_TIMED_SEQUENCE =
  'You do not have permission to change visit sequence for non-time dependent service. Please contact your supervisor if you need any further assistance.'

const CHANGE_NON_TIMED_MEDIUM =
  'You do not have permission to change visit medium for non-timed service. Please contact your supervisor if you need any further assistance.'

const CLICK_PLUS_BUTTON_CALENDAR =
  'You do not have permission to add visit from calendar view. Please contact your supervisor if you need any further assistance.'

const CLICK_DOWNLOAD_OR_PRINT_BUTTON =
  'You do not have permission to click on download or print button. Please contact your supervisor if you need any further assistance.'

const EDIT_APPOINTMENT =
  'You do not have permission to edit an appointment. Please contact your supervisor if you need any further assistance.'

const CLICK_DOLLAR_ICON =
  'You do not have permission to view payment details. Please contact your supervisor if you need any further assistance.'

const SCHEDULER_PAGE_SIZE_LIMIT = 100

const INVALID_RANGE_ERROR = 'Invalid date range'

const OUT_OF_RANGE_ERROR = 'Date must be after 1/1/2000'

const CLICK_AVAILABLE_SLOTS =
  'You do not have permission to click on available slots. Please contact your supervisor if you need any further assistance.'

const LIST_VIEW_FILTERS_KEY = 'ListViewFilters'
const CALENDAR_VIEW_FILTERS_KEY = 'CalendarViewFilters'
const SCHEDULER_VIEW_FILTERS_KEY = 'SchedulerViewFilters'
const ROUNDING_VIEW_FILTERS_KEY = 'RoundingViewFilters'
const PROVIDER_CODING_VIEW_FILTERS_KEY = 'ProviderCodingViewFilters'

enum StatusCode {
  NoPermission = 406,
  OverridePermission = 428,
  ProceedConfirmation = 412,
}

enum CategoryValue {
  ListView = 'FieldValue_Sch_ListView',
  CalendarView = 'FieldValue_Sch_CalendarView',
  SchedulerView = 'FieldValue_Sch_SchedulerView',
  RoundingView = 'FieldValue_Sch_RoundingView',
  ProviderCodingView = 'FieldValue_Sch_ProviderCodingView',
}

enum TIMEZONE_TYPES {
  PROVIDER_PREFERRED = 'ProviderPreferred',
  LOCATION_PREFERRED = 'LocationPreferred',
}

const CACHED_FILTERS_KEY = 'cached-filters-key'

const EXCLUDED_PROVIDER_TYPES: string[] = [
  ProviderType.Anesthesiology,
  ProviderType.Bcba,
  ProviderType.FamilyMedicine,
  ProviderType.NotSet,
  ProviderType.Pmnr,
]

export {
  ROUNDING_FILTERS,
  PROVIDER_CODING_FILTERS,
  LIST_VIEW_FILTERS,
  CALENDAR_VIEW_FILTERS,
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
  INVALID_RANGE_ERROR,
  OUT_OF_RANGE_ERROR,
  CLICK_AVAILABLE_SLOTS,
  CategoryValue,
  LIST_VIEW_FILTERS_KEY,
  CALENDAR_VIEW_FILTERS_KEY,
  SCHEDULER_VIEW_FILTERS_KEY,
  ROUNDING_VIEW_FILTERS_KEY,
  PROVIDER_CODING_VIEW_FILTERS_KEY,
  CACHED_FILTERS_KEY,
  EXCLUDED_PROVIDER_TYPES,
  TIMEZONE_TYPES,
  LIST_VIEW_COLUMNS,
  LIST_VIEW_COLUMNS_KEY,
  ROUNDING_VIEW_COLUMNS,
  ROUNDING_VIEW_COLUMNS_KEY,
  PROVIDER_CODING_VIEW_COLUMNS,
  PROVIDER_CODING_VIEW_COLUMNS_KEY,
  DAY_PATTERN,
  ALWAYS_VISIBLE_COLUMNS,
}
