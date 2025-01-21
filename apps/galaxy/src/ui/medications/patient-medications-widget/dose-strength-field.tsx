'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const DoseStrengthField = () => {
  const form = useFormContext<AddMedicationSchemaType>()
  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="quicknotes-date" orientation="vertical" required>
        Dose Strength
      </BlockLabel>
      <TextField.Root
        size="1"
        placeholder=""
        className="mt-1"
        {...form.register('doseStrength')}
      />
    </Flex>
  )
}

export { DoseStrengthField }
