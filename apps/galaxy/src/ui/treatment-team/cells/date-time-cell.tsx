import { parseAbsoluteToLocal } from '@internationalized/date'
import { Grid } from '@radix-ui/themes'
import { TextCell } from '@/components'
import { Metadata } from '@/types'
import { getUtcTime } from '@/ui/schedule/utils'
import { formatDateManually } from '@/utils'

const DateTimeCell = ({
  metadata,
  checkUpdatedOn = false,
}: {
  metadata: Metadata
  checkUpdatedOn?: boolean
}) => {
  const dateString =
    (checkUpdatedOn ? metadata?.updatedOn : undefined) ??
    metadata?.createdOn ??
    null

  if (!dateString) {
    return (
      <Grid className="grid-cols-2 gap-1">
        <TextCell className="px-1">—</TextCell>
        <TextCell className="px-1 text-gray-9">—</TextCell>
      </Grid>
    )
  }

  const date = formatDateManually(dateString)
  const time = getUtcTime(parseAbsoluteToLocal(dateString))
  return (
    <Grid className="grid-cols-2 gap-1">
      <TextCell className="px-1">{date}</TextCell>
      <TextCell className="px-1 text-gray-9">{time?.slice(0, 5)}</TextCell>
    </Grid>
  )
}

export { DateTimeCell }
