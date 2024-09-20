'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

const SelectMethod = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1 !font-medium">
        Select Payment Method
      </FormFieldLabel>
      <SelectInput
        size="1"
        placeholder="Select Type"
        field="paymentMethod"
        buttonClassName="border-pp-gray-2 w-[145px] h-6 border border-solid !outline-none [box-shadow:none]"
        options={options}
      />
      <FormFieldError name="paymentMethod" />
    </FormFieldContainer>
  )
}

const options = [
  {
    label: 'Credit Card',
    value: 'Credit Card',
  },
  {
    label: 'Cheque',
    value: 'Cheque',
  },
  {
    label: 'Cash',
    value: 'Cash',
  },
  {
    label: 'CMD',
    value: 'CMD',
  },
]
export { SelectMethod }
