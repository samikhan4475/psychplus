'use client'

import { Flex,Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { DrugBlockProps, MedicationType } from '../../types'
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
  const { watch } = useFormContext()
  const medicationType = watch('medicationType')
  const prnShow = medicationType === MedicationType.Home

  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <Flex gap="2">
        <DoseStrengthField index={index} />
        <DrugFormField index={index} />
        <RouteField index={index} />
      </Flex>
      <Flex gap="2">
        <DurationField index={index} />
        <DurationUnitField index={index} />
        <FrequencyField index={index} />
      </Flex>
      <Flex align="end" gap="2">
        {prnShow && (
          <>
            <PRNField index={index} />
            <PrnReasonField index={index} />
          </>
        )}
      </Flex>
      <Flex align="end" gap="2">

        <QuantityField index={index} />
        <DoseUnitField index={index} />
        <RefillField index={index} />
        <SubstitutionField index={index} />

      </Flex>
      <Flex gap="2">
        <SigField index={index} />
        <MedicationStatusField index={index} />
      </Flex>

      <Flex gap="2" wrap="wrap">
        <StartDateTime index={index} />

        {prnShow && <EndDateTime index={index} />}

        {prnShow ? (
          <Box width="100%">
            <PrescriberField index={index} />
          </Box>
        ) : (
          <PrescriberField index={index} />
        )}
      </Flex>
      <InstructionsOrNotesField index={index} />
      <Flex width="100%" direction="column">
        <BlockLabel>Diagnosis</BlockLabel>
        <SearchDiagnosis index={index} />
        <WorkingDiagnosis index={index} />
      </Flex>
    </Flex>
  )
}

export { PrescriptionAccordianContent }
