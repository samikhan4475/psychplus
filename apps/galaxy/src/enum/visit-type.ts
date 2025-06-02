enum VisitTypeEnum {
  Outpatient = 'Outpatient',
  ResidentCare = 'ResidentCare',
  EdVisit = 'EdVisit',
  TransitionalCare = 'TransitionalCare',
  IndividualPsychotherapy = 'IndividualPsychotherapy',
  FamilyPsychotherapy = 'FamilyPsychotherapy',
  Ect = 'Ect',
  Tms = 'Tms',
  Spravato = 'Spravato',
  HospitalCareInitial = 'HospitalCare/Initial',
  HospitalCareSubsequent = 'HospitalCare/Subsequent',
  HospitalCareDischarge = 'HospitalCare/Discharge',
  HospitalCareInitialDischarge = 'HospitalCare/InitialDischarge',
  NursingHomeCareInitial = 'NursingHomeCare/Initial',
  NursingHomeCareSubsequent = 'NursingHomeCare/Subsequent',
  NursingHomeCareDischarge = 'NursingHomeCare/Discharge',
  NursingHomeCareInitialDischarge = 'NursingHomeCare/InitialDischarge',
  PhpCareInitial = 'PhpCare/Initial',
  PhpCareSubsequent = 'PhpCare/Subsequent',
  PhpCareDischarge = 'PhpCare/Discharge',
  PhpCareInitialDischarge = 'PhpCare/InitialDischarge',
  UDS = 'UDS',
}

enum VisitMediumEnum {
  InPerson = 'InPerson',
  TeleVisit = 'TeleVisit',
  Unavailable = 'unavailable',
  Either = 'Either',
  Na = 'NA',
}
export { VisitTypeEnum, VisitMediumEnum }
