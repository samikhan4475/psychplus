'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PropsWithIndex } from './types'

const ReactionField = ({ index }: PropsWithIndex) => {
  const codes = useCodesetCodes(CODESETS.AllergyReaction)
  const options = useMemo(
    () =>
      codes.map((code) => ({
        value: code.value,
        label: code.display,
      })),
    [],
  )

  return (
    <Flex direction="column" width="70%">
      <BlockLabel name="Reaction">Reaction</BlockLabel>
      <SelectInput
        field={`allergies.${index}.reactionId`}
        options={options}
        className="w-full"
        buttonClassName="flex-1"
      />
      <FormFieldError name={`allergies.${index}.reactionId`} />
    </Flex>
  )
}

export { ReactionField }
