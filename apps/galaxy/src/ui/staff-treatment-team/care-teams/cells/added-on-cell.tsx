import { parseAbsoluteToLocal } from '@internationalized/date'
import { PropsWithRow, TextCell } from '@/components'
import { getUtcTime } from '@/ui/schedule/utils'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'
import { formatDateManually } from '@/utils'

const AddedOnCell = ({ row: { original: record } }: PropsWithRow<CareTeam>) => {
  const dateString = record.metadata.createdOn ?? ''
  const date = formatDateManually(dateString)
  const time = getUtcTime(parseAbsoluteToLocal(dateString))
  return (
    <TextCell>
      {date} {time?.slice(0, 5)}
    </TextCell>
  )
}

export { AddedOnCell }
