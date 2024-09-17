const CODE_RACE = '1000-9'
const CODE_ETHNICITY = '2133-7'
const RACES_GROUPING_CODES = ['R', 'R1', 'R2', 'R3', 'R4', 'R5']
const ETHNICITIES_GROUPING_CODES = ['E', 'E1', 'E2']

const CODESETS = {
  UsStates: 'PsychPlusPublic.UsStates',
  Gender: 'Gender',
  CustomerStatus: 'CustomerStatus',
  GenderOrientation: 'GenderOrientation',
  GenderExpression: 'GenderExpression',
  GenderPronoun: 'GenderPronoun',
  Language: 'Language',
  RaceAndEthnicity: 'cdc.PH_RaceAndEthnicity_CDC',
  ProfSuffix: 'HL7v2.Degree',
  LanguageAbility: 'HL7v3.LanguageAbilityMode',
  LanguageProficiency: 'HL7v3.LanguageAbilityProficiency',
  Religion: 'HL7v3.ReligiousAffiliation',
  CommonLanguages: 'FHIR.CommonLanguages',
  FirstResponder: 'psychpluspublic.FirstResponderOccupation',
  VisitMedium: 'AppointmentType',
  ServicesOffered: 'ServicesOffered',
  ProviderType: 'ProviderType',
  SpecialistType: 'SpecialistType',
  AppointmentStatus: 'AppointmentStatus',
  EncounterType: 'EncounterType',
  NotificationStatus: 'NotificationStatusType',
  NotificationChannel: 'NotificationChannel',
  Relationship: 'HL7v3.RoleCode',
  InsurancePolicyPriority: 'InsurancePolicyPriority',
  InsuranceRelationship: 'InsuranceRelationship',
  TransactionType: 'TransactionType',
}

export {
  CODESETS,
  RACES_GROUPING_CODES,
  ETHNICITIES_GROUPING_CODES,
  CODE_RACE,
  CODE_ETHNICITY,
}
