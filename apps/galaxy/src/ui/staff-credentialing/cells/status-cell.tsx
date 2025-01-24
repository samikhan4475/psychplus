import { getLocalTimeZone, today } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { cn, isDateInRange } from '@/utils'
import { SchemaType } from '../schema'
import { License, LicenseStatus } from '../types'

const StatusCell = ({ row: { original } }: PropsWithRow<License>) => {
  const { setValue } = useFormContext<SchemaType>()
  const options = useCodesetOptions(CODESETS.LicenseStatus)
  const { id, startDate, endDate } = original
  const isInRange =
    startDate && endDate
      ? isDateInRange(today(getLocalTimeZone()), startDate, endDate)
      : false
  let status = LicenseStatus.Na
  if (id && isInRange) status = LicenseStatus.Active
  else if (id && !isInRange) status = LicenseStatus.Inactive

  return (
    <SelectCell
      value={status}
      options={options}
      onValueChange={(value) => setValue(`status`, value as LicenseStatus)}
      disabled
      className={cn({
        'bg-pp-red-100': id ? !isInRange : false,
        'bg-pp-green-100': id ? isInRange : false,
      })}
    />
  )
}

export { StatusCell }
