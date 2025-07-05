import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
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

const AllergySpecificationView = ({ index, isEditMode }: PropsWithIndex) => {
  const { watch } = useFormContext()

  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      {isEditMode && (
        <Flex direction="column">
          <BlockLabel name="Allergy Name">Allergy Name</BlockLabel>
          <Text className="border-pp-table-border mt-1 w-full rounded-2 border p-1">
            {watch(`allergies.${index}.allergyName`) || '—'}
          </Text>
        </Flex>
      )}

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
          <BlockLabel>Observation Date</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field={`allergies.${index}.startDate`}/>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="flex-1" direction="column">
          <BlockLabel>End Date</BlockLabel>
          <Flex gap="2">
            <Flex className="flex-1">
              <DatePickerInput field={`allergies.${index}.endDate`} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <InstructionOrNotesField index={index} />
    </Flex>
  )
}

export { AllergySpecificationView }
