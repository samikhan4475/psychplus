import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Claim } from '@/types'
import { cn } from '@/utils'
import { claimNoteSignedStatuses } from '../types'

const getBackgroundColor = (status: claimNoteSignedStatuses) => {
  const statusColors = {
    [claimNoteSignedStatuses.NONE]: 'bg-pp-grey',
    [claimNoteSignedStatuses.SIGNED]: 'bg-pp-success-bg',
    [claimNoteSignedStatuses.SIGNED_PENDING]: 'bg-pp-red-100',
    [claimNoteSignedStatuses.PENDING]: 'bg-pp-warning-bg-1',
    [claimNoteSignedStatuses.COSIGNED]: 'bg-pp-focus-bg',
  }

  return statusColors[status] || ''
}

const NoteSignedStatusCell = ({
  row: { original: claim },
}: PropsWithRow<Claim>) => {
  const backgroundColor = getBackgroundColor(
    claim.noteSignedStatus as claimNoteSignedStatuses,
  )

  return (
    <Box
      className={cn('rounded-lg inline-flex w-full p-[2px]', backgroundColor)}
    >
      <Text
        size="1"
        className="flex items-center overflow-hidden whitespace-nowrap"
      >
        {claim.noteSignedStatus}
      </Text>
    </Box>
  )
}
export { NoteSignedStatusCell }
