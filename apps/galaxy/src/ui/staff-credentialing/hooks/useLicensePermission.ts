import { USER_PERMISSIONS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { LicenseType } from '../types'

export const useLicensePermissions = (licenseType: LicenseType) => {
  let changeOwnAlertFromAdminNonAdminViewPermission: keyof typeof USER_PERMISSIONS
  let changeOthersAlertFromAdminNonAdminViewPermission: keyof typeof USER_PERMISSIONS
  let viewHistoryPermission: keyof typeof USER_PERMISSIONS
  let editPermission: keyof typeof USER_PERMISSIONS

  if (licenseType === LicenseType.License) {
    changeOwnAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOwnLicenseAlertFromAdminNonAdminView'
    changeOthersAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOthersLicenseAlertFromAdminView'
    viewHistoryPermission = 'canClickLicenseHistoryIconFromAdminNonAdminView'
    editPermission = 'canClickLicenseEditIconFromAdminView'
  } else if (licenseType === LicenseType.DEA) {
    changeOwnAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOwnDeaAlertFromAdminNonAdminView'
    changeOthersAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOthersDeaAlertFromAdminView'
    viewHistoryPermission = 'canClickDeaHistoryIconFromAdminNonAdminView'
    editPermission = 'canClickDeaEditIconFromAdminView'
  } else {
    changeOwnAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOwnCdsAlertFromAdminNonAdminView'
    changeOthersAlertFromAdminNonAdminViewPermission =
      'canUncheckOrCheckOthersCdsAlertFromAdminView'
    viewHistoryPermission = 'canClickCdsHistoryIconFromAdminNonAdminView'
    editPermission = 'canClickCdsEditIconFromAdminView'
  }

  const canChangeOwnAlert = useHasPermission(
    changeOwnAlertFromAdminNonAdminViewPermission,
  )
  const canChangeOthersAlert = useHasPermission(
    changeOthersAlertFromAdminNonAdminViewPermission,
  )
  const canViewHistory = useHasPermission(viewHistoryPermission)
  const canEdit = useHasPermission(editPermission)

  return { canChangeOwnAlert, canChangeOthersAlert, canViewHistory, canEdit }
}
