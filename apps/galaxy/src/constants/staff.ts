const STAFF_ROLE_CODE_PRESCRIBER = '1'

enum StaffCredentials {
  MD = 'MD',
  DO = 'DO',
  NP = 'NP',
  PA = 'PA',
  RN = 'RN',
}

const DEFAULT_STAFF_PAYLOAD_PARAMS = {
  isResultsForNameList: true,
  isIncludeTestProviders: false,
  isIncludePreferredTimezone: false,
  isIncludeBiography: false,
  isIncludeAttributions: false,
  isIncludeOrganizations: false,
  isIncludePractices: false,
  isIncludeMetadataResourceChangeControl: false,
}
export { STAFF_ROLE_CODE_PRESCRIBER, StaffCredentials,DEFAULT_STAFF_PAYLOAD_PARAMS }
