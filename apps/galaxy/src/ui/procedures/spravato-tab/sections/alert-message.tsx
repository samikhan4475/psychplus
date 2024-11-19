import { Box, Flex, Text } from '@radix-ui/themes'
import { ErrorIcon } from '@/components/icons'
import { cn } from '@/utils'

const AlertMessage = ({
  message,
  error = true,
}: {
  message: string
  error?: boolean
}) => {
  return (
    <Flex direction="row" gap="1" align="center" ml={error ? '4' : '2'}>
      {error ? (
        <ErrorIcon className="h-4 w-4" />
      ) : (
        <Box className="bg-pp-icon-sub rounded-full h-1 w-1" />
      )}
      <Text
        weight="regular"
        size="1"
        className={cn(error && 'text-pp-states-error')}
      >
        {message}
      </Text>
    </Flex>
  )
}

export { AlertMessage }
