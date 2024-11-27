import { TextField } from '@radix-ui/themes'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { PropsWithRow, TextCell } from '@/components'
import { cn } from '@/utils'
import { useStore } from '../../store'
import { DEA } from '../../types'
import { SchemaType } from '../schema'

const LicenseCell = ({ row }: PropsWithRow<DEA>) => {
  const { editingRow } = useStore()
  const { control, watch, register } = useFormContext<SchemaType>()
  const { fields } = useFieldArray({ control, name: 'deaData' })

  const license = watch(`deaData.${row.index}.license`)

  return row.index === editingRow ? (
    <TextField.Root
      {...register(`deaData.${row.index}.license`)}
      defaultValue={license}
      size="1"
      className={cn('h-5 w-full text-gray-12')}
    />
  ) : (
    <TextCell>{fields[row.index]?.license}</TextCell>
  )
}

export { LicenseCell }
