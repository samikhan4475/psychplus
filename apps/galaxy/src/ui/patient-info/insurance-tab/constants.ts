const PATIENT_INSURANCE = 'patientInsurances'

enum InsurancePolicyPriority {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
  Other = 'Other',
}

const InsurancePermissionMessages = {
  addInsurance:
    'You do not have permission to Add Insurance. Please contact your supervisor if you need any further assistance',
  saveInsurance:
    'You do not have permission to Save Insurance. Please contact your supervisor if you need any further assistance',
  checkInsuranceHistory:
    'You do not have permission to Check History. Please contact your supervisor if you need any further assistance',
  changeVerificationStatus:
    'You do not have permission to change verification status. Please contact your supervisor if you need any further assistance',
}

export {
  PATIENT_INSURANCE,
  InsurancePermissionMessages,
  InsurancePolicyPriority,
}
