import { cn } from '@psychplus-v2/utils'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'

interface FormErrorProps {
  message?: string
  className?: string
}

const FormError = ({ message, className }: FormErrorProps) =>
  message ? (
    <Flex
      align="center"
      className={cn('rounded-3 bg-tomato-3', className)}
      py="3"
      px="4"
      gap="3"
      mb="2"
    >
      <ExclamationTriangleIcon
        width={20}
        height={20}
        className="text-tomato-10"
      />
      <Text className="text-[13px]">
        {message.length < 500 ? message : 'Something went wrong'}
      </Text>
    </Flex>
  ) : null

export { FormError }
