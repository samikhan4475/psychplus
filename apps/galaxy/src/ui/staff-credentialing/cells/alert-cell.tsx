import { useFormContext } from 'react-hook-form'
import { CheckboxCell, PropsWithRow } from '@/components'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { License } from '../types'

const AlertCell = ({ row }: PropsWithRow<License>) => {
  const { editingRow } = useStore()
  const { watch, setValue } = useFormContext<SchemaType>()

  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  return (
    <CheckboxCell
      checked={isInEdit ? watch(`isAlertCheck`) : row.original.isAlertCheck}
      className="ml-[-2px]"
      onCheckedChange={(checked) => setValue(`isAlertCheck`, checked)}
      disabled={!isInEdit}
    />
  )
}

export { AlertCell }
