import { Flex } from '@radix-ui/themes'
import { TextCell } from '@/components'
import { ErrorIcon } from '@/components/icons'
import { cn } from '@/utils'

const BloodPressureCell = ({
  systolic,
  diastolic,
}: {
  systolic: string
  diastolic: string
}) => {
  return (
    <Flex direction="row" gap="1" align="center">
      {(+systolic >= 140 || +diastolic >= 90) && (
        <ErrorIcon className="h-4 w-4" />
      )}
      <TextCell
        className={cn(
          (Number(systolic) >= 140 || Number(diastolic) >= 90) &&
            'text-pp-states-error',
        )}
      >{`${systolic}/${diastolic} mmHg`}</TextCell>
    </Flex>
  )
}

export { BloodPressureCell }
