import { Flex, Text } from '@radix-ui/themes'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/utils'
import { TREATMENT_STATUS } from '../types'

const TreatmentStatus = ({
  status,
  message,
}: {
  status: TREATMENT_STATUS
  message: string
}) => {
  return (
    <Flex
      direction="row"
      gap="1"
      align="center"
      className={cn(
        status === TREATMENT_STATUS.Error &&
          'border-pp-red-border bg-pp-red-100 w-[60%] rounded-2 border px-1 py-[2px]',
        status === TREATMENT_STATUS.Success &&
          'border-pp-green-2 bg-pp-success-bg w-[60%] rounded-2 border px-1 py-[2px]',
        status === TREATMENT_STATUS.Info &&
          'border-pp-blue-border bg-pp-blue-100 w-[60%] rounded-2 border px-1 py-[2px]',
      )}
    >
      <CircleAlert
        className={cn(
          status === TREATMENT_STATUS.Error && 'fill-pp-states-error h-4 w-4',
          status === TREATMENT_STATUS.Success &&
            'fill-pp-states-success h-4 w-4',
          status === TREATMENT_STATUS.Info && 'fill-pp-states-info h-4 w-4',
        )}
        color="white"
      />
      <Text size="1">{message}</Text>
    </Flex>
  )
}

export { TreatmentStatus }
