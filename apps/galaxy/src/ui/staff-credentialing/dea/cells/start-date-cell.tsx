import { useFieldArray, useFormContext } from 'react-hook-form'
import { DatePickerInput, PropsWithRow, TextCell } from '@/components'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { useStore } from '../../store'
import { DEA } from '../../types'
import { SchemaType } from '../schema'

const StartDateCell = ({ row }: PropsWithRow<DEA>) => {
  const editingRow = useStore((state) => state.editingRow)
  const { control } = useFormContext<SchemaType>()
  const { fields } = useFieldArray({ control, name: 'deaData' })

  return row.index === editingRow ? (
    <DatePickerInput field={`deaData.${row.index}.startDate`} />
  ) : (
    <TextCell className={cn('h-full w-full flex-1 content-center')}>
      {getSlashedPaddedDateString(fields[row.index]?.startDate?.toString())}
    </TextCell>
  )
}

export { StartDateCell }
