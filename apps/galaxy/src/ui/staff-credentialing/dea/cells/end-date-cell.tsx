import { useFieldArray, useFormContext } from 'react-hook-form'
import { DatePickerInput, PropsWithRow, TextCell } from '@/components'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { useStore } from '../../store'
import { DEA } from '../../types'
import { isInNext30Days, isInNext90Days } from '../../util'
import { SchemaType } from '../schema'

const EndDateCell = ({ row }: PropsWithRow<DEA>) => {
  const editingRow = useStore((state) => state.editingRow)
  const { control } = useFormContext<SchemaType>()
  const { fields } = useFieldArray({ control, name: 'deaData' })

  const isIn30Days = isInNext30Days(fields[row.index]?.endDate)
  const isIn90Days = isInNext90Days(fields[row.index]?.endDate)

  return row.index === editingRow ? (
    <DatePickerInput field={`deaData.${row.index}.endDate`} />
  ) : (
    <TextCell
      className={cn('h-full w-full flex-1 content-center', {
        'bg-pp-red-100': isIn30Days && isIn90Days,
        'bg-pp-warning-bg-1': isIn90Days && !isIn30Days,
      })}
      wrapperClass="w-full"
    >
      {getSlashedPaddedDateString(fields[row.index]?.endDate?.toString())}
    </TextCell>
  )
}

export { EndDateCell }
