import { Flex, Text } from '@radix-ui/themes'
import { BookingCancelIcon } from '@/components-v2'
import { BackToHomeButton } from './buttons'

interface AppointmentsCancelledProps {
  message?: string
}

const AppointmentsCancelled = ({ message }: AppointmentsCancelledProps) => {
  return (
    <Flex direction="column" align="center" gap="3" className="text-center">
      <BookingCancelIcon />
      <Flex
        direction="column"
        align="center"
        gap="1"
        className="border-b border-gray-6"
        pb="6"
      >
        <Text size={{ initial: '5', sm: '6', md: '7' }} className="font-[600]">
          {message ?? 'Your Visit has been Cancelled!'}
        </Text>
      </Flex>
      <BackToHomeButton />
    </Flex>
  )
}

export { AppointmentsCancelled }
