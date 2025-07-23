enum FEATURE_FLAGS {
  ehr8973EnableDawMedicationApi = 'ehr8973EnableDawMedicationApi',
  ehr11786EnableGalaxySecondPhaseFeatures = 'ehr11786EnableGalaxySecondPhaseFeatures',
  ehr4907LabOrdersAndResults = 'ehr4907LabOrdersAndResults',
  ehr7795RoundingAndProviderView = 'ehr7795RoundingAndProviderView',
  ehr7406Surescripts = 'ehr7406Surescripts',
  ehr14021PmpIntegration = 'ehr14021PmpIntegration',
  ehr15606AutoPMPCheckInMedicationWidget = 'ehr15606AutoPMPCheckInMedicationWidget',
}
// Prefetching for layout and main pages
enum MAIN_PAGE_FEATURE_FLAGS {
  eehr8973EnableDawMedicationApi = 'ehr8973EnableDawMedicationApi',
  ehr11786EnableGalaxySecondPhaseFeatures = 'ehr11786EnableGalaxySecondPhaseFeatures',
  ehr4907LabOrdersAndResults = 'ehr4907LabOrdersAndResults',
  ehr9475AudioVideoTelemedicine = 'ehr9475AudioVideoTelemedicine',
  ehr7246EnableClaimManagementTab = 'ehr7246EnableClaimManagementTab',
}
const ACCESS_UNAVAILABLE_MESSAGE =
  ' You currently don’t have access to this feature because your account is not connected to SureScripts, the secure network for e-prescribing.'
const FLAG_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
export {
  FEATURE_FLAGS,
  MAIN_PAGE_FEATURE_FLAGS,
  FLAG_EXPIRY_MS,
  ACCESS_UNAVAILABLE_MESSAGE,
}
