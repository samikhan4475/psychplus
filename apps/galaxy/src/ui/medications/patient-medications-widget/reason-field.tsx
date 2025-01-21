'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel, MultiSelectField } from '@/components'
import { OPTIONS } from './constants'

const ReasonField = () => {
  return (
    <>
      <BlockLabel className="mr-3">Reason</BlockLabel>
      <Flex className="w-full">
        <MultiSelectField
          options={OPTIONS}
          className="w-full"
          onChange={() => {}}
        />
      </Flex>
    </>
  )
}

export { ReasonField }
