'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextInput } from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'

const SigField = ({ index }: DrugBlockProps) => {
  const field = getFieldName(index, 'sigDescription')

  return (
    <Flex direction="column" width="45%">
      <BlockLabel name="SigField" orientation="vertical" required>
        Sig
      </BlockLabel>
      <TextInput field={field} placeHolder="Sig" className="mt-1 h-6 w-full" />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { SigField }
