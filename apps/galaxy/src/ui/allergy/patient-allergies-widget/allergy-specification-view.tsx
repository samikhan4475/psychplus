import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  DatePickerInput,
  FormFieldError,
  TimeInput,
} from '@/components'
import { AllergyTypeField } from './allergy-type'
import { InstructionOrNotesField } from './instruction-notes-field'
import { ReactionField } from './reaction-field'
import { SeverityField } from './severity-field'
import { StatusField } from './status-field'
import { PropsWithIndex } from './types'

const AllergySpecificationView = ({ index }: PropsWithIndex) => {
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <Flex width="100%" gap="2">
        <AllergyTypeField index={index} />
        <SeverityField index={index} />
      </Flex>
      <Flex width="100%" gap="2">
        <ReactionField index={index} />
        <StatusField index={index} />
      </Flex>
      <Flex width="100%" gap="2">
        <Flex className="flex-1" direction="column">
          <BlockLabel>Observation Date & Time</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field={`allergies.${index}.startDate`} />
            </Flex>
            <Flex className="flex-1" direction="column">
              <TimeInput
                field={`allergies.${index}.startTime`}
                dateInputClass="h-6"
              />
              <FormFieldError name={`allergies.${index}.startTime`} />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="flex-1" direction="column">
          <BlockLabel>End Date & Time</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field={`allergies.${index}.endDate`} />
            </Flex>
            <Flex className="flex-1" direction="column">
              <TimeInput
                field={`allergies.${index}.endTime`}
                dateInputClass="h-6"
              />
              <FormFieldError name={`allergies.${index}.endTime`} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <InstructionOrNotesField index={index} />
    </Flex>
  )
}

export { AllergySpecificationView }
