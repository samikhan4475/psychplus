'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { AddAllergySchemaType } from './schema'
import { PropsWithIndex } from './types'

const InstructionOrNotesField = ({ index }: PropsWithIndex) => {
  const form = useFormContext<AddAllergySchemaType>()
  return (
    <Flex direction="column" className="mt-2 flex-1">
      <BlockLabel name="quicknotes-date" orientation="vertical">
        Instructions or Notes
      </BlockLabel>
      <TextField.Root
        size="1"
        placeholder="Add notes"
        className="mt-1"
        maxLength={2048}
        {...form.register(`allergies.${index}.comment`)}
      />
    </Flex>
  )
}

export { InstructionOrNotesField }
