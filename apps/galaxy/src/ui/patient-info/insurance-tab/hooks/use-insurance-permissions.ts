import { useHasPermission } from '@/hooks'

const useInsurancePermissions = () => {
  const canAddAuthRefInsurance = useHasPermission('canAddAuthRefInsurance')
  const canOpenInsuranceHistory = useHasPermission('canOpenInsuranceHistory')
  const canAddInsuranceInfo = useHasPermission('canAddInsuranceInfo')
  const canAddeligibilityCheckInsurance = useHasPermission(
    'canAddeligibilityCheckInsurance',
  )
  const canViewHistoryInsurancePage = useHasPermission(
    'canViewHistoryInsurancePage',
  )
  const canSaveInsuranceInfo = useHasPermission('canSaveInsuranceInfo')
  const canChangeVerificationStatusInsurance = useHasPermission(
    'canChangeVerificationStatusInsurance',
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
