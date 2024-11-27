import { useFormContext } from 'react-hook-form'
import { CheckboxCell, PropsWithRow } from '@/components'
import { useStore } from '../../store'
import { DEA } from '../../types'
import { SchemaType } from '../schema'

const AlertCell = ({ row }: PropsWithRow<DEA>) => {
  const { editingRow } = useStore()
  const { watch, setValue } = useFormContext<SchemaType>()

  return (
    <CheckboxCell
      checked={watch(`deaData.${row.index}.alert`)}
      className="ml-[-3px]"
      onCheckedChange={(checked) =>
        setValue(`deaData.${row.index}.alert`, checked)
      }
      disabled={editingRow !== row.index}
    />
  )
}

export { AlertCell }
