import { cn } from '@psychplus-v2/utils'
import { Badge } from '@/components-v2'
import { WaitlistStatus } from '../../types'

const WaitlistStatusCell = ({ status }: { status: WaitlistStatus }) => {
  const statusType = getStatusType(status)

  return (
    <Badge
      label={status}
      type={statusType}
      className={cn(
        statusType === 'warning' && '!text-pp-warning-bg-1',
        'h-6 !w-auto !rounded-2 !border-none !px-0 !font-bold',
      )}
    />
  )
}

const getStatusType = (status: WaitlistStatus) => {
  switch (status) {
    case WaitlistStatus.Available:
    case WaitlistStatus.Completed:
      return 'success'
    case WaitlistStatus.Scheduled:
      return 'info'
    case WaitlistStatus.Expired:
    case WaitlistStatus.Cancelled:
      return 'danger'
    case WaitlistStatus.Waitlist:
      return 'warning'
  }
}

export { WaitlistStatusCell }
