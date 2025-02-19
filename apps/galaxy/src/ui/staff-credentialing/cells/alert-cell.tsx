import { usePathname } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { CheckboxCell, PropsWithRow } from '@/components'
import { useLicensePermissions } from '../hooks/useLicensePermission'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { License, LicenseType } from '../types'

const CHANGE_OWN_ALERT = (licenseType: LicenseType) =>
  `You do not have permission to uncheck or check the alert for your OWN ${licenseType} from either "admin" or "non-admin". Please contact your supervisor if you need any further assistance.`
const CHANGE_OTHERS_ALERT = (licenseType: LicenseType) =>
  `You do not have permission to uncheck or check the alert for ${licenseType} for other than yourself from either "admin" or "non-admin". Please contact your supervisor if you need any further assistance.`

const AlertCell = ({
  row,
  showPermissionAlert,
}: PropsWithRow<License> & {
  showPermissionAlert: (isOpen: boolean, message: string) => void
}) => {
  const { editingRow } = useStore()
  const { watch, setValue } = useFormContext<SchemaType>()
  const pathName = usePathname()
  const { licenseType, providerStaffId } = row.original
  const { canChangeOthersAlert, canChangeOwnAlert } =
    useLicensePermissions(licenseType)

  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  const isAdminView = pathName.includes(`${providerStaffId ?? ''}`)
  return (
    <CheckboxCell
      checked={isInEdit ? watch(`isAlertCheck`) : row.original.isAlertCheck}
      className="ml-[-2px]"
      onCheckedChange={(checked) => {
        if (isAdminView) {
          if (!canChangeOthersAlert) {
            return showPermissionAlert(true, CHANGE_OTHERS_ALERT(licenseType))
          }
        } else if (!canChangeOwnAlert) {
          return showPermissionAlert(true, CHANGE_OWN_ALERT(licenseType))
        }
        setValue(`isAlertCheck`, checked)
      }}
      disabled={!isInEdit}
    />
  )
}

export { AlertCell }
