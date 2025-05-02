const PRE_CHECKIN_ASSESSMENT_KEY = 'pre-checkin-assessment-key'

enum PreCheckinAssessmentTabs {
  PatientInfo = 'Patient Info',
  Insurance = 'Insurance',
  Payment = 'Payment',
  AllergiesAndMedications = 'Allergies/ Medications',
  Pharmacy = 'Pharmacy',
  PresentingSymptomsHPI = 'Presenting symptoms (HPI)',
  Histories = 'Histories',
  ReviewOfSystems = 'Review of Systems',
  Questionnaire = 'Questionnaire',
}

enum SaveAction {
  Next = 'Next',
  Exit = 'Exit',
}

enum TabDirection {
  Next = 'Next',
  Back = 'Back',
}

export {
  PreCheckinAssessmentTabs,
  SaveAction,
  TabDirection,
  PRE_CHECKIN_ASSESSMENT_KEY,
}
