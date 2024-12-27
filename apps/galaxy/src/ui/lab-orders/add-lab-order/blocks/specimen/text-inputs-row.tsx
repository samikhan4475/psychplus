import { Flex } from '@radix-ui/themes'
import { ConditionDispositionInfo } from './condition-disposition-info'
import { MeasurementUnit } from './measurement-unit'
import { RejectedReason } from './rejected-reason'

const TextInputsRow = ({ index }: { index: number }) => {
  return (
    <Flex direction="row" gap="3" className="flex-grow-0">
      <MeasurementUnit index={index} />
      <RejectedReason index={index} />
      <ConditionDispositionInfo index={index} />
    </Flex>
  )
}

export { TextInputsRow }
