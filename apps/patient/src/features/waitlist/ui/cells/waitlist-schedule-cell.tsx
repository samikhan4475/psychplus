import { Button } from '@radix-ui/themes'
import { Waitlist, WaitlistStatus } from '../../types'
import { cn } from '@psychplus-v2/utils'

const WaitlistScheduleCell = ({ row }: { row: Waitlist }) => {

  return (
    <Button
      size="1"
      highContrast
      disabled={row.waitingStatus !== WaitlistStatus.Available}
      className={cn(
        row.waitingStatus !== WaitlistStatus.Available
          ? 'bg-[#A0B6DC]'
          : 'bg-pp-blue-3',
        'px-4 text-[white]',
      )}
    >
      Schedule
    </Button>
  )
}

export { WaitlistScheduleCell }
