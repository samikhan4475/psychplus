import { DatePickerInput, PropsWithRow, TextCell } from '@/components'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { useStore } from '../store'
import { License } from '../types'

const StartDateCell = ({ row }: PropsWithRow<License>) => {
  const editingRow = useStore((state) => state.editingRow)
  const isInEdit =
    row.original.stateCode === editingRow?.stateCode &&
    row.original.licenseType === editingRow?.licenseType
  const startDate = row.original.startDate

  return isInEdit ? (
    <DatePickerInput field={`startDate`} />
  ) : (
    <TextCell className={cn('h-full w-full flex-1 content-center pl-1')}>
      {getSlashedPaddedDateString(startDate?.toString())}
    </TextCell>
  )
}

export { StartDateCell }
