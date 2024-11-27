'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const options = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Signed', value: 'Signed' },
  { label: 'Signed/Pending', value: 'Signed/Pending' },
  { label: 'Co-Signed', value: 'Co-Signed' },
  { label: 'Error', value: 'Error' },
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
