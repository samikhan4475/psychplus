import { Box, Text } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { PatientAppointments } from '@/types'
import { cn } from '@/utils'
import { claimNoteSignedStatuses } from '../types'

const getBackgroundColor = (status: claimNoteSignedStatuses) => {
  const statusColors = {
    [claimNoteSignedStatuses.NONE]: 'bg-pp-grey',
    [claimNoteSignedStatuses.SIGNED]: 'bg-pp-success-bg',
    [claimNoteSignedStatuses.SIGNED_PENDING]: 'bg-pp-red-100',
    [claimNoteSignedStatuses.PENDING]: 'bg-pp-warning-bg-1',
    [claimNoteSignedStatuses.COSIGNED]: 'bg-pp-focus-bg',
    [claimNoteSignedStatuses.ERROR]: 'bg-pp-red',
  }

  return statusColors[status] || ''
}

const statusLabels: Record<claimNoteSignedStatuses, string> = {
  [claimNoteSignedStatuses.SIGNED]: 'Signed',
  [claimNoteSignedStatuses.NONE]: 'None',
  [claimNoteSignedStatuses.PENDING]: 'Pending',
  [claimNoteSignedStatuses.SIGNED_PENDING]: 'Signed/Pending',
  [claimNoteSignedStatuses.COSIGNED]: 'Co-Signed',
  [claimNoteSignedStatuses.ERROR]: 'Error',
}

const NoteSignedStatusCell = ({
  row: { original: appointment },
}: PropsWithRow<PatientAppointments>) => {
  const backgroundColor = getBackgroundColor(
    appointment.noteSignedStatus?.toLocaleLowerCase() as claimNoteSignedStatuses,
  )
  const getStatusLabel = (status: claimNoteSignedStatuses): string =>
    statusLabels[status] || status
  return (
    <Box
      className={cn('rounded-lg inline-flex w-full p-[2px]', backgroundColor)}
    >
      <Text
        size="1"
        className="flex items-center overflow-hidden whitespace-nowrap"
      >
        {getStatusLabel(
          appointment.noteSignedStatus?.toLocaleLowerCase() as claimNoteSignedStatuses,
        )}
      </Text>
    </Box>
  )
}
export { NoteSignedStatusCell }
