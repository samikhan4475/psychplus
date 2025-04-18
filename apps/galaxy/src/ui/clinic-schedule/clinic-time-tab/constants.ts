enum ClinicScheduleStatus {
  Error = 'Error',
  Pending = 'Pending',
  Inactive = 'Inactive',
  Active = 'Active',
}

enum ClinicAlertMessages {
  APPROVE_CLINIC_SCHEDULES_MESSAGE = 'You do not have permission to approve clinic schedules. Please contact your supervisor if you need any further assistance.',
  CLICK_UPDATE_CLINIC_SCHEDULE = 'You do not have permission to update Clinic Schedule. Please contact your supervisor if you need any further assistance.',
  CLICK_ADD_CLINIC_SCHEDULE = 'You do not have permission to add Clinic Schedule. Please contact your supervisor if you need any further assistance.',
  UPDATE_STATUS_ALERT = 'You do not have permission to change status of a clinic schedule. Please contact your supervisor if you need any further assistance.',
  CLICK_ACTIVE_VISIT_CLINIC = 'You do not have permission to view Active Visit Schedules. Please contact your supervisor if you need any further assistance.',
}

export { ClinicScheduleStatus, ClinicAlertMessages }
