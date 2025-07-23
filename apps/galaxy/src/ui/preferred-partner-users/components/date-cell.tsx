import { TextCell } from '@/components'
import { PreferredPartnerUser } from '@/types'
import { cn, formatDate } from '@/utils'

interface DateCellProps {
  original: PreferredPartnerUser
  dateField: 'addDate' | 'termDate'
}

export const DateCell = ({ original, dateField }: DateCellProps) => {
  const isDeleted = (user: PreferredPartnerUser) =>
    user.recordStatus === 'Deleted'

  return (
    <TextCell
      className={cn('truncate', isDeleted(original) && 'text-gray-400')}
    >
      {original?.[dateField]
        ? formatDate(original[dateField], 'MM/dd/yy')
        : '-'}
    </TextCell>
  )
}
