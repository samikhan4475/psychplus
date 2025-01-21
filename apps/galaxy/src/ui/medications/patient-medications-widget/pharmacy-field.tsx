'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'
import { AddMedicationSchemaType } from './patient-current-medication-tab-view'

const PharmacyField = () => {
  const form = useFormContext<AddMedicationSchemaType>()

  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="allergyType">Pharmacy</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('pharmacy', values)}
        defaultValues={form.watch('pharmacy')}
        className="w-full"
      />
    </Flex>
  )
}

export { PharmacyField }
