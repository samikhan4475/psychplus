const APPOINTMENTS_SEARCH_SESSION_KEY = 'appointments-search-session-key'
const APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY = 'scheduling-appointment-store'

enum AppointmentSortBy {
  Nearest = 'nearest',
  FirstAvailable = 'firstAvailable',
  Rating = 'rating',
}

export {
  AppointmentSortBy,
  APPOINTMENTS_SEARCH_SESSION_KEY,
  APPOINTMENTS_SEARCH_SESSION_PUBLIC_KEY,
}
