enum ProviderType {
  Psychiatrist = 'Psychiatrist',
  Therapy = 'Therapist',
  Bcba = 'Bcba',
}

enum Role {
  MD = 'MD',
  DO = 'DO',
  NP = 'NP',
  PA = 'PA',
}

enum Services {
  OutpatientPsychiatry = 'Psychiatry',
  IndividualTherapy = 'Therapy',
  FamilyCoupleTherapy = 'CouplesFamilyTherapy',
  ABA = 'Aba',
  GroupTherapy = 'GroupTherapy',
  TMS = 'Tms',
  Spravato = 'Spravato',
  KetamineIV = 'Ketamine',
  IVIMTreatment = 'IVIMTreatment',
  PHP = 'PartialHospital',
  IOP = 'IntensiveOutpatient',
}

export { Services, ProviderType, Role }
