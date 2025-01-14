import { Flex } from '@radix-ui/themes'
import { BlockLabel, DatePickerInput, TimeInput } from '@/components'
import { AllergyTypeField } from './allergy-type'
import { InstructionOrNotesField } from './instruction-notes-field'
import { ReactionField } from './reaction-field'
import { SeverityField } from './severity-field'
import { StatusField } from './status-field'

const AllergySpecificationView = () => {
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <Flex width="100%" gap="2">
        <AllergyTypeField />
        <SeverityField />
      </Flex>
      <Flex width="100%" gap="2">
        <ReactionField />
        <StatusField />
      </Flex>
      <Flex width="100%" gap="2">
        <Flex className="flex-1" direction="column">
          <BlockLabel>Observation Date & Time</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field="startDate" />
            </Flex>
            <Flex className="flex-1">
              <TimeInput field="startTime" dateInputClass="h-6" />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="flex-1" direction="column">
          <BlockLabel>End Date & Time</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field="endDate" />
            </Flex>
            <Flex className="flex-1">
              <TimeInput field="endTime" dateInputClass="h-6" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <InstructionOrNotesField />
    </Flex>
  )
}

export { AllergySpecificationView }
