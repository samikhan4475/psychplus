import { PropsWithRow, TextCell } from '@/components'
import { isInNext30Days, isInNext90Days } from '@/ui/staff-credentialing/util'
import { cn, getSlashedPaddedDateString } from '@/utils'
import { License } from '../types'

const EndDateCell = ({ row }: PropsWithRow<License>) => {
  const { endDate } = row.original
  const isIn30Days = endDate ? isInNext30Days(endDate) : false
  const isIn90Days = endDate ? isInNext90Days(endDate) : false
  return (
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
