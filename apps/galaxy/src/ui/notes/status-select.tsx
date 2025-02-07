'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const options = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Signed', value: 'Signed' },
  { label: 'Signed/Pending', value: 'SignedPending' },
  { label: 'Co-Signed', value: 'Cosigned' },
  { label: 'Error', value: 'Error' },
]

const StatusSelect = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Note Status
      </FormFieldLabel>
      <SelectInput
        field="status"
        placeholder="Select"
        options={options}
        buttonClassName={buttonClassName}
        disabled={disabled}
      />
      <FormFieldError name="status" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { StatusSelect, options }
