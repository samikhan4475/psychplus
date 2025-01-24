import { DatePickerInput, PropsWithRow, TextCell } from '@/components'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { useStore } from '../store'
import { License } from '../types'
import { isInNext30Days, isInNext90Days } from '../util'

const EndDateCell = ({ row }: PropsWithRow<License>) => {
  const editingRow = useStore((state) => state.editingRow)
  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  const endDate = row.original.endDate
  const isIn30Days = endDate ? isInNext30Days(endDate) : false
  const isIn90Days = endDate ? isInNext90Days(endDate) : false
  return isInEdit ? (
    <DatePickerInput field={`endDate`} />
  ) : (
    <TextCell
      className={cn('h-full w-full flex-1 content-center pl-1', {
        'bg-pp-red-100': isIn30Days && isIn90Days,
        'bg-pp-warning-bg-1': isIn90Days && !isIn30Days,
      })}
      wrapperClass="w-full"
    >
      {getSlashedPaddedDateString(endDate?.toString())}
    </TextCell>
  )
}

export { EndDateCell }
