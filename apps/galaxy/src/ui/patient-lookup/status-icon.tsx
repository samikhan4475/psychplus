import { Flex } from '@radix-ui/themes'
import {
  CloseIcon,
  DangerIcon,
  EmptyIcon,
  InvalidIcon,
  PendingIcon,
  RoundAlertIcon,
  RoundTickIcon,
} from '@/components/icons'

const icons: Record<string, JSX.Element> = {
  Verified: <RoundTickIcon />,
  Pending: <PendingIcon />,
  NotRequested: <CloseIcon />,
  NotVerified: <RoundAlertIcon />,
  Unverifiable: <RoundAlertIcon />,
  Active: <RoundTickIcon />,
  Expired: <DangerIcon />,
  Invalid: <InvalidIcon />,
}

const getStatusIcon = (status?: string): JSX.Element => {
  return status ? icons[status] : <EmptyIcon />
}

interface StatusIconProps {
  status?: string
}

const StatusIcon = ({ status }: StatusIconProps) => (
  <Flex align="center" justify="center" height="100%" width="100%">
    {getStatusIcon(status)}
  </Flex>
)

export { StatusIcon }
