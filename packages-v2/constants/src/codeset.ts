const CODESET_CACHE_SECONDS = 3600
const CODE_NOT_SET = 'NotSet'
const CODE_NOT_SPECIFIED = 'NotSpecified'
const CODE_RACE = '1000-9'
const CODE_ETHNICITY = '2133-7'
const RACES_GROUPING_CODES = ['R', 'R1', 'R2', 'R3', 'R4', 'R5']
const ETHNICITIES_GROUPING_CODES = ['E', 'E1', 'E2']

const CODESETS = {
  UsStates: 'PsychPlusPublic.UsStates',
  Gender: 'Gender',
  GenderOrientation: 'GenderOrientation',
  GenderExpression: 'GenderExpression',
  GenderPronoun: 'GenderPronoun',
  Language: 'Language',
  InsuranceRelationship: 'InsuranceRelationship',
  GuardianRelationship: 'GuardianRelationship',
  InsurancePolicyPriority: 'InsurancePolicyPriority',
  RaceAndEthnicity: 'cdc.PH_RaceAndEthnicity_CDC',
  ProfSuffix: 'HL7v2.Degree',
  LanguageProficiency: 'HL7v3.LanguageAbilityProficiency',
  LanguageAbility: 'HL7v3.LanguageAbilityMode',
  Religion: 'HL7v3.ReligiousAffiliation',
  DelusionType: 'PsychPlusPublic.DelusionType',
  HallucinationType: 'PsychPlusPublic.HallucinationType',
  Relationship: 'HL7v3.RoleCode',
}

export {
  CODESET_CACHE_SECONDS,
  CODE_NOT_SET,
  CODE_NOT_SPECIFIED,
  CODESETS,
  CODE_RACE,
  CODE_ETHNICITY,
  RACES_GROUPING_CODES,
  ETHNICITIES_GROUPING_CODES,
}
