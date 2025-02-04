import { useHasPermission } from '@/hooks'

const useInsurancePermissions = () => {
  const canAddAuthRefInsurance = useHasPermission('addAuthRefInsurancePage')
  const canOpenInsuranceHistory = useHasPermission('openInsuranceHistory')
  const canAddInsuranceInfo = useHasPermission('addInsuranceInfo')
  const canAddeligibilityCheckInsurance = useHasPermission(
    'eligibilityCheckInsurancePage',
  )
  const canViewHistoryInsurancePage = useHasPermission(
    'viewHistoryInsurancePage',
  )
  const canSaveInsuranceInfo = useHasPermission('saveInsuranceInfo')
  const canChangeVerificationStatusInsurance = useHasPermission(
    'changeVerificationStatusInsurance',
  )

  return {
    canAddAuthRefInsurance,
    canOpenInsuranceHistory,
    canAddInsuranceInfo,
    canAddeligibilityCheckInsurance,
    canViewHistoryInsurancePage,
    canSaveInsuranceInfo,
    canChangeVerificationStatusInsurance,
  }
}

export { useInsurancePermissions }
