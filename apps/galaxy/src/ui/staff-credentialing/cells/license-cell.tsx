import { useFormContext } from 'react-hook-form'
import { PropsWithRow, TextCell } from '@/components'
import { InputCell } from '@/ui/reports/add-template-dialog/input-cell'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { License } from '../types'

const LicenseCell = ({ row }: PropsWithRow<License>) => {
  const { editingRow } = useStore()
  const { watch } = useFormContext<SchemaType>()
  const license = watch(`licenseNumber`)

  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  return isInEdit ? (
    <InputCell field={`licenseNumber`} defaultValue={license} />
  ) : (
    <TextCell className='pl-1'>{row.original.licenseNumber}</TextCell>
  )
}

export { LicenseCell }
