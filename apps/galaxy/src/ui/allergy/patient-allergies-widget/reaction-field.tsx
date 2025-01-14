'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, MultiSelectField } from '@/components'
import { AddAllergySchemaType } from './add-allergy'
import { OPTIONS } from './constant'

const ReactionField = () => {
  const form = useFormContext<AddAllergySchemaType>()

  return (
    <Flex direction="column" width="70%">
      <BlockLabel name="Reaction">Reaction</BlockLabel>
      <MultiSelectField
        options={OPTIONS}
        onChange={(values) => form.setValue('reaction', values)}
        className="w-full"
      />
    </Flex>
  )
}

export { ReactionField }
