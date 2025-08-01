enum AppointmentType {
  Virtual = 'TeleVisit',
  InPerson = 'InPerson',
  Either = 'Either',
}

enum AppointmentStatus {
  CancelledP = 'CancelledP',
  ConfirmedP = 'ConfirmedP',
  Scheduled = 'Scheduled',
  Rescheduled = 'Rescheduled',
}

enum ServiceOffered {
  Therapy = 'Therapy',
  Psychiatry = 'Psychiatry',
}

const DISTANCE_IN_MILES_OPTIONS = ['5', '10', '20', '50', '100', '200']
const DEFAULT_APPOINTMENT_CACHE_TIME = 3 * 60 * 1000
const DEFAULT_SLOTS_FUTURE_OUTLOOK = 14
const DEFAULT_RADIUS_DISTANCE = '100'
export {
  AppointmentType,
  AppointmentStatus,
  ServiceOffered,
  DISTANCE_IN_MILES_OPTIONS,
  DEFAULT_APPOINTMENT_CACHE_TIME,
  DEFAULT_SLOTS_FUTURE_OUTLOOK,
  DEFAULT_RADIUS_DISTANCE
}
