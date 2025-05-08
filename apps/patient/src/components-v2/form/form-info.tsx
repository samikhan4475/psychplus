import { cn } from '@psychplus-v2/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'

interface FormInfoProps {
  message?: string
  className?: string
}

const FormInfo = ({ message, className }: FormInfoProps) => {
  if (!message) return null

  return (
    <Flex
      align="center"
      justify="between"
      className={cn('bg-pp-info-bg-1 rounded-3', className)}
      py="3"
      px="4"
      gap="3"
      mb="2"
    >
      <Flex align="center" gap="3">
        <InfoCircledIcon width={20} height={20} className="text-pp-info-text" />
        <Text className="text-pp-info-text text-[13px]">{message}</Text>
      </Flex>
    </Flex>
  )
}

export { FormInfo }
