'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const PrescriberField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="allergyType">Prescriber</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('prescriber', values)}
        defaultValues={form.watch('prescriber')}
        className="w-full"
      />
    </Flex>
  )
}

export { PrescriberField }
