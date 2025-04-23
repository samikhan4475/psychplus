'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import { DrugBlockProps } from '../../types'
import { DoseStrengthField } from './dose-strength-field'
import { DoseUnitField } from './dose-unit-field'
import { DrugFormField } from './drug-form-field'
import { DurationField } from './duration-field'
import { DurationUnitField } from './duration-unit-field'
import { EndDateTime } from './end-date-time-field'
import { FrequencyField } from './frequency-field'
import { InstructionsOrNotesField } from './instructions-notes-field'
import { MedicationStatusField } from './medication-status-field'
import { PrescriberField } from './prescriber-field'
import { PRNField } from './prn-checbox-field'
import { PrnReasonField } from './prn-reason-field'
import { QuantityField } from './quantity-field'
import { RefillField } from './refill-field'
import { RouteField } from './route-field'
import { SearchDiagnosis } from './search-diagonisis'
import { SigField } from './sig-field'
import { StartDateTime } from './start-date-time-field'
import { SubstitutionField } from './substitution-field'
import { WorkingDiagnosis } from './working-diagnosis'

const PrescriptionAccordianContent = ({ index }: DrugBlockProps) => {
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <Flex gap="2">
        <DoseStrengthField index={index} />
        <DoseUnitField index={index} />
        <DrugFormField index={index} />
      </Flex>
      <Flex gap="2">
        <DurationField index={index} />
        <DurationUnitField index={index} />
        <RouteField index={index} />
        <FrequencyField index={index} />
      </Flex>
      <Flex align="end" gap="2">
        <PRNField index={index} />
        <PrnReasonField index={index} />
        <QuantityField index={index} />
      </Flex>
      <Flex gap="2">
        <SigField index={index} />
        <RefillField index={index} />
        <MedicationStatusField index={index} />
      </Flex>

      <Flex gap="2">
        <StartDateTime index={index} />
        <EndDateTime index={index} />
      </Flex>

      <Flex gap="2">
        <PrescriberField index={index} />
        <SubstitutionField index={index} />
      </Flex>
      <InstructionsOrNotesField index={index} />
      <Flex width="100%" direction="column">
        <BlockLabel>Diaganosis</BlockLabel>
        <SearchDiagnosis index={index} />
        <WorkingDiagnosis index={index} />
      </Flex>
    </Flex>
  )
}

export { PrescriptionAccordianContent }
