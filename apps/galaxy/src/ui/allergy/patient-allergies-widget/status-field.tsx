'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, SelectInput } from '@/components'
import { OPTIONS } from './constant'
import { PropsWithIndex } from './types'

const StatusField = ({ index }: PropsWithIndex) => {
  return (
    <Flex direction="column" width="30%">
      <BlockLabel name="Status">Status</BlockLabel>
      <SelectInput
        field={`allergies.${index}.status`}
        options={OPTIONS}
        className="w-full"
        buttonClassName="flex-1"
      />
      <FormFieldError name={`allergies.${index}.status`} />
    </Flex>
  )
}

export { StatusField }
