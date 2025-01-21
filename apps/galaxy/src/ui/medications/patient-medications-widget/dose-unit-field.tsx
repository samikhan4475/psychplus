'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const DoseUnitField = () => {
  const form = useFormContext<AddMedicationSchemaType>()
  return (
    <Flex direction="column" className="flex-1">
      <BlockLabel name="allergyType">Dose Unit</BlockLabel>
      <MultiSelectField
        defaultValues={form.watch('doseUnit')}
        options={OPTIONS}
        onChange={(values) => form.setValue('doseUnit', values)}
        className="w-full"
      />
    </Flex>
  )
}

export { DoseUnitField }
