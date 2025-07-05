'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PropsWithIndex } from './types'

const AllergyTypeField = ({ index }: PropsWithIndex) => {
  const codes = useCodesetCodes(CODESETS.AllergyType)
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
      <BlockLabel name="allergyType" required>Allergy Type</BlockLabel>
      <SelectInput
        field={`allergies.${index}.allergyType`}
        options={options}
        className="w-full"
        buttonClassName="flex-1"
      />
      <FormFieldError name={`allergies.${index}.allergyType`} />
    </Flex>
  )
}

export { AllergyTypeField }
