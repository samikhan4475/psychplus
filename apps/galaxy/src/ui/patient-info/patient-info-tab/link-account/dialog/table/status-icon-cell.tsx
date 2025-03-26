import { Flex } from '@radix-ui/themes'
import {
  CloseIcon,
  EmptyIcon,
  QuestionIcon,
  RoundTickIcon,
} from '@/components/icons'

const icons: Record<string, JSX.Element> = {
  Verified: <RoundTickIcon />,
  Pending: <QuestionIcon />,
  Unverifiable: <CloseIcon />,
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
