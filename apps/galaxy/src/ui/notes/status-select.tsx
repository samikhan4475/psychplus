'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const options = [
  {
    label: 'test1',
    value: 'test1',
  },
  {
    label: 'test2',
    value: 'test2',
  },
  {
    label: 'test3',
    value: 'test3',
  },
  {
    label: 'test4',
    value: 'test4',
  },
]

const StatusSelect = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">Status</FormFieldLabel>
      <SelectInput
        field="status"
        placeholder="Select"
        options={options}
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="status" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { StatusSelect }
