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

export { AppointmentType, AppointmentStatus }
