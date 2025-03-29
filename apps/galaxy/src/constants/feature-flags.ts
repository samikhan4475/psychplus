enum FEATURE_FLAGS {
  ehr8973EnableDawMedicationApi = 'ehr8973EnableDawMedicationApi',
  ehr11786EnableGalaxySecondPhaseFeatures = 'ehr11786EnableGalaxySecondPhaseFeatures',
  ehr4907LabOrdersAndResults = 'ehr4907LabOrdersAndResults',
  ehr7795RoundingAndProviderView = 'ehr7795RoundingAndProviderView',
}
// Prefetching for layout and main pages
enum MAIN_PAGE_FEATURE_FLAGS {
  eehr8973EnableDawMedicationApi = 'ehr8973EnableDawMedicationApi',
  ehr11786EnableGalaxySecondPhaseFeatures = 'ehr11786EnableGalaxySecondPhaseFeatures',
  ehr4907LabOrdersAndResults = 'ehr4907LabOrdersAndResults',
  ehr9475AudioVideoTelemedicine = 'ehr9475AudioVideoTelemedicine',
  ehr7246EnableClaimManagementTab = 'ehr7246EnableClaimManagementTab',
}
const FLAG_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
export { FEATURE_FLAGS, MAIN_PAGE_FEATURE_FLAGS, FLAG_EXPIRY_MS }
