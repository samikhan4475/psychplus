import { DateValue } from '@internationalized/date'
import {
  CheckboxIcon,
  CounterClockwiseClockIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TableEditIcon } from '@/components/icons'
import { useLicensePermissions } from '../hooks/useLicensePermission'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { License, LicenseType } from '../types'

const CLICK_HISTORY =
  'You do not have permission to click "history" icon from either "admin" or "non-admin". Please contact your supervisor if you need any further assistance.'
const CLICK_EDIT =
  'You do not have permission to click "Edit" icon from "admin". Please contact your supervisor if you need any further assistance.'

const ActionsCell = ({
  row,
  onSubmit,
  showPermissionAlert,
}: {
  row: License
  onSubmit: (data: SchemaType) => void
  showPermissionAlert: (isOpen: boolean, message: string) => void
}) => {
  const form = useFormContext<SchemaType>()
  const { editingRow, setEditingRow, setHistoryRow } = useStore()
  const { canViewHistory, canEdit } = useLicensePermissions(row.licenseType)

  if (!row.isCDSState && row.licenseType === LicenseType.CDS) return null

  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      {editingRow === null || editingRow.stateCode !== row.stateCode ? (
        <>
          <IconButton
            variant="ghost"
            onClick={() => {
              if (canViewHistory) setHistoryRow(row)
              else {
                showPermissionAlert(true, CLICK_HISTORY)
              }
            }}
          >
            <CounterClockwiseClockIcon className="text-black cursor-pointer" />
          </IconButton>
          <IconButton
            variant="ghost"
            onClick={() => {
              if (!canEdit) {
                showPermissionAlert(true, CLICK_EDIT)
                return
              }
              form.reset()
              setEditingRow(row)
              form.setValue('stateCode', row.stateCode)
              form.setValue('stateName', row.stateName ?? '')
              form.setValue('status', row.status)
              form.setValue('licenseType', row.licenseType)
              form.setValue('licenseNumber', row.licenseNumber)
              form.setValue('startDate', row.startDate as DateValue)
              form.setValue('endDate', row.endDate as DateValue)
              form.setValue('isAlertCheck', row.isAlertCheck ?? true)
            }}
          >
            <TableEditIcon height={18} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            variant="ghost"
            onClick={() => {
              setEditingRow(null)
              form.reset()
            }}
          >
            <CrossCircledIcon />
          </IconButton>
          <IconButton
            variant="ghost"
            onClick={form.handleSubmit((data) => onSubmit(data))}
          >
            <CheckboxIcon width={22} height={18} />
          </IconButton>
        </>
      )}
    </Flex>
  )
}

export { ActionsCell }
