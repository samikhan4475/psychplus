import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  CheckboxCell,
  DatePickerInput,
  TimeInput,
} from '@/components'
import { DoseStrengthField } from './dose-strength-field'
import { DoseUnitField } from './dose-unit-field'
import { DrugFormField } from './drug-form-field'
import { DurationField } from './duration-field'
import { DurationUnitField } from './duration-unit-field'
import { FrequencyField } from './frequency-field'
import { InstructionsOrNotesField } from './instructions-notes-field'
import { PharmacyField } from './pharmacy-field'
import { PrescriberField } from './prescriber-field'
import { PrnReasonField } from './prn-reason-field'
import { QuantityField } from './quantity-field'
import { RefillField } from './refill-field'
import { RouteField } from './route-field'
import { SearchDiagnosis } from './search-diagonisis'
import { StatusField } from './status-field'
import { SubstitutionField } from './substitution-field'

const MedicationSpecificationView = () => {
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <Flex width="100%" gap="2">
        <DoseStrengthField />
        <DoseUnitField />
        <DrugFormField />
      </Flex>
      <Flex width="100%" gap="2">
        <DurationField />
        <DurationUnitField />
        <RouteField />
      </Flex>
      <Flex width="100%" gap="2">
        <FrequencyField />
        <Flex className="mt-5">
          <CheckboxCell
            label="PRN"
            checked={false}
            onCheckedChange={() => {}}
          />
        </Flex>
        <PrnReasonField />
      </Flex>
      <Flex width="100%" gap="2">
        <QuantityField />
        <RefillField />
        <StatusField />
      </Flex>
      <Flex width="100%" gap="2">
        <Flex className="flex-1" direction="column">
          <BlockLabel>Start Date & Time</BlockLabel>
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
      <Flex width="100%" gap="2">
        <PrescriberField />
        <PharmacyField />
        <SubstitutionField />
      </Flex>
      <Flex width="100%" direction="column">
        <InstructionsOrNotesField />
      </Flex>
      <Flex width="100%" direction="column">
        <BlockLabel>Diaganosis</BlockLabel>
        <SearchDiagnosis />
      </Flex>
    </Flex>
  )
}

export { MedicationSpecificationView }
