import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { IconButton, Popover, Text } from '@radix-ui/themes'
import { StatusHistoryTable } from './status-history-table'

interface StatusClockPopoverProps {
  staffId: number
  patientId: string
  isPsychiatry?: boolean
}

const StatusClockPopover = ({
  patientId,
  staffId,
  isPsychiatry,
}: StatusClockPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost" size="1" className="ml-0.5 mr-0.5">
          <CounterClockwiseClockIcon color="black" width={16} height={16} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="z-10 flex-col p-1">
        <Text size="3" weight="medium">
          Status Hx
        </Text>
        <StatusHistoryTable
          patientId={patientId}
          staffId={staffId}
          isPsychiatry={isPsychiatry}
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export { StatusClockPopover }
