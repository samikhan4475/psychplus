import { useFormContext } from 'react-hook-form'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useStore } from '../../store'
import { DEA } from '../../types'
import { SchemaType } from '../schema'

const StatusCell = ({ row }: PropsWithRow<DEA>) => {
  const { editingRow } = useStore()
  const { setValue, watch } = useFormContext<SchemaType>()

  const options = useCodesetOptions(CODESETS.LicenseStatus)

  const status = watch(`deaData.${row.index}.status`)

  return (
    <SelectCell
      value={status}
      options={options}
      onValueChange={(value) => setValue(`deaData.${row.index}.status`, value)}
      disabled={editingRow !== row.index}
    />
  )
}

export { StatusCell }
